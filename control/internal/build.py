#!/usr/bin/env python3

import glob
import os
import shutil
import subprocess
import time

from contextlib import contextmanager
from concurrent.futures import ProcessPoolExecutor

from sys import argv


@contextmanager
def pushd(new_dir, create=False):
    if create:
        os.makedirs(new_dir, exist_ok=True)
    current_dir = os.getcwd()
    os.chdir(new_dir)
    yield
    os.chdir(current_dir)


@contextmanager
def task(description):
    print("[Start] " + description)
    try:
        t = time.time()
        yield
        t = time.time() - t
        print("[Done ] {} ({:.03f}s)".format(description, t))
    except Exception as ex:
        print("[FAIL ] " + description)
        print(ex)
        raise RuntimeError


def run(*cmd, **kwargs):
    print_cmd = kwargs.pop("print_cmd", False)
    if print_cmd:
        print("[from {}]".format(os.getcwd()), " ".join(cmd))
    p = subprocess.Popen(
        cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True
    )
    stdout, _ = p.communicate()
    success_code = kwargs.pop("success_code", 0)
    success_codes = kwargs.pop("success_codes", None)
    if success_codes is None:
        if p.returncode != success_code:
            raise RuntimeError(stdout.decode())
    else:
        if p.returncode not in success_codes:
            raise RuntimeError(stdout.decode())


def runpython(*cmd, **kwargs):
    run(*(["python"] + list(cmd)), **kwargs)


def copyfiles(src, dest):
    for file in glob.glob(src):
        shutil.copy(file, dest)


def jp(*parts):
    return os.path.join(*parts)


HOME = os.getcwd()
SERVER_BUILD_PATH = jp(HOME, "dist", "build_root", "server")
SERVER_SRC_PATH = jp(SERVER_BUILD_PATH, "src")
PRINTER_BUILD_PATH = jp(HOME, "dist", "build_root", "printer")


def copy_python_module(module):
    dest_dir = jp(SERVER_SRC_PATH, module)
    os.makedirs(dest_dir, exist_ok=True)
    copyfiles(jp(HOME, module, "*.py"), dest_dir)


@task("Copying python sources")
def task_prepare_python_sources():
    os.makedirs(SERVER_SRC_PATH, exist_ok=True)
    copyfiles(jp(HOME, "*.py"), SERVER_SRC_PATH)
    if os.path.exists(jp(SERVER_SRC_PATH, "settings_prod.py")):
        os.unlink(jp(SERVER_SRC_PATH, "settings_prod.py"))
    run(
        "robocopy",
        jp(HOME, "scoring_systems"),
        jp(SERVER_SRC_PATH, "scoring_systems"),
        "*.py",
        "/s",
        success_code=1,
    )
    copy_python_module("service")
    copy_python_module("protection")
    copy_python_module("models")
    copy_python_module("helpers")
    copy_python_module("webserver")


def task_build_python_module(module):
    with task("Building module {}".format(module)):
        with pushd(module):
            runpython("_compile.py", "build_ext", "--inplace")


@task("Building python sources")
def task_build_all_python_modules():
    with pushd(SERVER_SRC_PATH):
        modules = [
            root for root, _dirs, files in os.walk(".") if "_compile.py" in files
        ]
        with ProcessPoolExecutor(len(modules)) as p:
            p.map(task_build_python_module, modules)


@task("Bundling python modules")
def task_bundle_python_modules():
    with pushd(SERVER_BUILD_PATH):
        runpython(jp(HOME, "control", "internal", "make_exe_spec.py"), SERVER_SRC_PATH)
        run("pyinstaller", "exe.spec")
        run(
            "robocopy",
            jp(SERVER_BUILD_PATH, "dist", "rockjudge"),
            jp(HOME, "dist", "data"),
            "/s",
            success_codes=(0, 1, 2, 3),
        )


@task("Building server")
def task_build_server():
    task_prepare_python_sources()
    task_build_all_python_modules()
    task_bundle_python_modules()


@task("Building JS and CSS files")
def task_build_js_css():
    output_dir = jp(os.getcwd(), "dist", "data", "static")
    with pushd("client"):
        run("call", "gulp", "all", "--gtype", "production", "--gdest", output_dir)


@task("Copying screen")
def task_copy_screen():
    screen_dir = jp(HOME, "dist", "data", "screen")
    run(
        "robocopy",
        jp(HOME, "screen"),
        screen_dir,
        "/s",
        "/XD",
        jp(HOME, "screen", "src", "node_modules"),
        success_code=1,
    )


@task("Copying static files")
def task_copy_static():
    static_dir = jp(os.getcwd(), "dist", "data", "static")
    os.makedirs(static_dir, exist_ok=True)
    run(
        "robocopy",
        jp(HOME, "static", "thirdparty"),
        jp(static_dir, "thirdparty"),
        "/s",
        success_code=1,
    )
    run(
        "robocopy",
        jp(HOME, "static", "img"),
        jp(static_dir, "img"),
        "/s",
        success_code=1,
    )


@task("Copying templates")
def task_copy_templates():
    os.makedirs(jp(HOME, "dist", "data", "templates"), exist_ok=True)
    copyfiles(jp(HOME, "templates", "*.html"), jp(HOME, "dist", "data", "templates"))


@task("Building client")
def task_build_client():
    task_copy_templates()
    task_copy_screen()
    task_copy_static()
    task_build_js_css()


@task("Building print server")
def task_build_print_server():
    os.makedirs(PRINTER_BUILD_PATH, exist_ok=True)
    os.makedirs(jp(HOME, "dist", "print_server"), exist_ok=True)
    shutil.copy(jp(HOME, "tools", "print.py"), PRINTER_BUILD_PATH)
    with pushd(PRINTER_BUILD_PATH):
        run("pyinstaller", "-F", jp(PRINTER_BUILD_PATH, "print.py"))
    shutil.copy(
        jp(PRINTER_BUILD_PATH, "dist", "print.exe"), jp(HOME, "dist", "print_server")
    )
    shutil.copy(
        jp(HOME, "tools", "print-config-sample.txt"),
        jp(HOME, "dist", "print_server", "print-config.txt"),
    )


@task("Copying launch scripts")
def task_copy_launch_scripts():
    run(
        "robocopy",
        jp(HOME, "control", "internal", "exe_controllers"),
        jp(HOME, "dist"),
        success_codes=(0, 1, 2, 3),
    )


@task("Building RockJudge")
def task_build_all():
    if os.path.exists("dist"):
        shutil.rmtree("dist")
    with ProcessPoolExecutor(3) as p:
        p.submit(task_build_server)
        p.submit(task_build_client)
        p.submit(task_build_print_server)
    task_copy_launch_scripts()
    shutil.rmtree(jp(HOME, "dist", "build_root"))


if __name__ == "__main__":
    try:
        args = argv[1:]
        if len(args) == 0:
            task_build_all()
        else:
            globals()["task_" + argv[1]]()
    except RuntimeError:
        pass
