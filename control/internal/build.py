import json
import os
import shutil
from pathlib import Path
from time import sleep
from typing import List

from build_lib import BuildController, BuildManager

if __name__ != "__main__":
    raise RuntimeError("This file should never be imported")


build_mgr = BuildManager()
step = build_mgr.step_decorator


@step("Loading client modules", terminal=True)
def get_client_modules(ctl: BuildController) -> List[str]:
    configs_str, _err = ctl.run_exe(
        "node",
        Path("env", "node_modules", "gulp", "bin", "gulp.js").absolute(),
        "--tasks-json",
        "--gbase",
        "",
        "--gdest",
        "",
        chdir=Path("env"),
    )
    print(_err)
    configs_json = json.loads(configs_str)
    modules: List[str] = []
    for node in configs_json["nodes"]:
        if node["type"] == "task" and node["nodes"] == []:
            modules.append(node["label"])
    return modules


@step("Building module {1}", terminal=True)
def build_client_module(
    ctl: BuildController, dest_path: Path, module_name: str
) -> None:
    ctl.run_exe(
        "node",
        Path("env", "node_modules", "gulp", "bin", "gulp.js").absolute(),
        module_name,
        "--gtype",
        "production",
        "--gbase",
        Path("src", "client").absolute(),
        "--gdest",
        (dest_path / "data").absolute(),
        chdir=Path("env").absolute(),
    )


@step("Building client")
def client(ctl: BuildController, dest_path: Path) -> None:
    modules: List[str] = ctl.child_step("get_client_modules").run()
    ctl.run_parallel(
        *(
            ctl.child_step("build_client_module", dest_path, module)
            for module in modules
        )
    )


@step("Setting up Python build environment", terminal=True)
def prepare_python_src(ctl: BuildController, dest_dir: Path) -> None:
    base_dir = Path("src", "server").absolute()
    dest_dir = dest_dir.absolute()
    for root, files in ctl.walk_path(base_dir):
        for fn in files:
            if not fn.endswith(".py"):
                continue
            os.makedirs(str(dest_dir / root), exist_ok=True)
            shutil.copy(str(base_dir / root / fn), str(dest_dir / root / fn))


@step(lambda md, td: f"Compiling module {md.relative_to(td)}", terminal=True)
def build_python_module(
    ctl: BuildController, module_dir: Path, _temp_dir: Path
) -> None:
    ctl.run_exe(
        "python", module_dir / "_compile.py", "build_ext", "--inplace", chdir=module_dir
    )


@step("Compiling Python modules")
def build_python(ctl: BuildController, src_dir: Path) -> None:
    modules_paths = [
        src_dir / root
        for root, files in ctl.walk_path(src_dir)
        if "_compile.py" in files
    ]
    ctl.run_parallel(
        *(
            ctl.child_step(
                "build_python_module", module_path.absolute(), src_dir.absolute()
            )
            for module_path in modules_paths
        )
    )


@step("Bundling everything together", terminal=True)
def bundle_python(ctl: BuildController, src_dir: Path, dest_dir: Path) -> None:
    ctl.run_exe(
        "python",
        Path("control", "internal", "make_exe_spec.py").absolute(),
        src_dir,
        chdir=src_dir,
    )
    ctl.run_exe("pyinstaller", "exe.spec", chdir=src_dir)
    ctl.copytree(src_dir / "dist" / "rockjudge", dest_dir / "data")


@step("Copying templates")
def copy_templates(ctl: BuildController, dest_dir: Path) -> None:
    ctl.copytree(Path("src", "server", "templates"), dest_dir / "data" / "templates")


@step("Building server")
def server(ctl: BuildController, dest_dir: Path) -> None:
    with ctl.make_temp_dir() as src_temp_dir:
        ctl.child_step("prepare_python_src", src_temp_dir).run()
        ctl.child_step("build_python", src_temp_dir).run()
        ctl.child_step("bundle_python", src_temp_dir, dest_dir).run()
        ctl.child_step("copy_templates", dest_dir).run()


@step("Building print server", terminal=True)
def print_server(ctl: BuildController, dest_dir: Path) -> None:
    src_path = Path("src", "tools", "print.py")
    config_path = Path("src", "tools", "print-config-sample.txt")
    os.makedirs(str(dest_dir / "print_server"), exist_ok=True)
    with ctl.make_temp_dir() as temp_dir:
        shutil.copy(str(src_path), str(temp_dir))
        ctl.run_exe("pyinstaller", "--noupx", "-F", "print.py", chdir=temp_dir)
        shutil.copy(
            str(temp_dir / "dist" / "print.exe"), str(dest_dir / "print_server")
        )
        shutil.copy(
            str(config_path), str(dest_dir / "print_server" / "print-config.txt")
        )


@step("Building sources")
def build(ctl: BuildController, dest_dir: Path) -> None:
    ctl.run_parallel(
        ctl.child_step("client", dest_dir),
        ctl.child_step("server", dest_dir),
        ctl.child_step("print_server", dest_dir),
    )


@step("Adding control scripts")
def copy_scripts(_ctl: BuildController, dest_path: Path) -> None:
    for fn in Path("control", "internal", "exe_controllers").iterdir():
        shutil.copy(str(fn), str(dest_path))


@step("Exporting result")
def move_result(_ctl: BuildController, temp_dir: Path, dest_path: Path) -> None:
    sleep(1)  # Hack to wait for al directory locks to become released
    if os.path.exists(dest_path):
        shutil.rmtree(str(dest_path))
    shutil.move(str(temp_dir), str(dest_path))


@step("Building RockJudge")
def all(ctl: BuildController) -> None:
    dest_path = Path("dist")
    with ctl.make_temp_dir() as temp_dir:
        ctl.child_step("build", temp_dir).run()
        ctl.child_step("copy_scripts", temp_dir).run()
        ctl.child_step("move_result", temp_dir, dest_path).run()


build_mgr.start("all")
