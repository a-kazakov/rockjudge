#!/usr/bin/env python3

import glob
import os
import shutil
import subprocess
import sys
import time

from contextlib import contextmanager


@contextmanager
def pushd(new_dir, create=False):
    if create:
        os.makedirs(new_dir)
    current_dir = os.getcwd()
    os.chdir(new_dir)
    yield
    os.chdir(current_dir)


@contextmanager
def task(description):
    print(description, end=" ... ")
    sys.stdout.flush()
    try:
        t = time.time()
        yield
        t = time.time() - t
        print("OK ({:.03f}s)".format(t))
    except Exception as ex:
        print("FAIL")
        print(ex)
        raise RuntimeError


def run(*cmd, **kwargs):
    p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, shell=True)
    stdout, _ = p.communicate()
    success_code = kwargs.pop("success_code", 0)
    if p.returncode != success_code:
        raise RuntimeError(stdout.decode())


def copyfiles(src, dest):
    for file in glob.glob(src):
        shutil.copy(file, dest)


def jp(*parts):
    res = parts[0]
    for p in parts[1:]:
        res = os.path.join(res, p)
    return res

home = os.getcwd()


def copy_python_module(module):
    dest_dir = jp("src", module)
    os.mkdir(dest_dir)
    copyfiles(jp(home, module, "*.py"), dest_dir)


def build_module(name):
    with pushd(jp("src", name)):
        with task("Building {} module".format(name)):
            run("py", "-3", "_compile.py", "build_ext", "--inplace")


shutil.rmtree("dist", ignore_errors=True)

try:
    with pushd("dist", True):
        with pushd("tmp", True):

            os.mkdir("src")

            with task("Copying python sources"):
                copyfiles(jp(home, "*.py"), "src")
                if os.path.exists(jp("src", "settings_prod.py")):
                    os.unlink(jp("src", "settings_prod.py"))
                run("robocopy", jp(home, "scoring_systems"), jp("src", "scoring_systems"), "*.py", "/s", success_code=1)
                copy_python_module("service")
                copy_python_module("protection")
                copy_python_module("models")
                copy_python_module("helpers")
                copy_python_module("webserver")

            build_module("protection")
            build_module("models")
            build_module("scoring_systems")
            build_module("webserver")

            with task("Bundling everything together"):
                run("py", "-3", jp(home, "control", "internal", "make_exe_spec.py"))
                run("py", "-3", jp(home, "external-tools", "pyinstaller", "pyinstaller.py"), "exe.spec")

            with task("Bulding JS"):
                with pushd(jp(home, "static")):
                    shutil.move("js", "js_old")
                    with pushd("src"):
                        run("call", "gulp", "all", "--type", "production")

            with task("Copying static files"):
                os.mkdir(jp("dist", "rockjudge", "static"))
                run("robocopy", jp(home, "static", "thirdparty"), jp("dist", "rockjudge", "static", "thirdparty"), "/s", success_code=1)
                run("robocopy", jp(home, "static", "img"), jp("dist", "rockjudge", "static", "img"), "/s", success_code=1)
                run("robocopy", jp(home, "static", "js"), jp("dist", "rockjudge", "static", "js"), "*.js", "/s", success_code=1)
                run("robocopy", jp(home, "static", "css"), jp("dist", "rockjudge", "static", "css"), "*.css", "/s", success_code=1)
                with pushd(jp(home, "static")):
                    shutil.rmtree("js")
                    shutil.move("js_old", "js")

            with task("Copying templates"):
                os.mkdir(jp("dist", "rockjudge", "templates"))
                copyfiles(jp(home, "templates", "*.html"), jp("dist", "rockjudge", "templates"))

            with task("Copying screen"):
                os.mkdir(jp("dist", "rockjudge", "screen"))
                run("robocopy", jp(home, "screen"), jp("dist", "rockjudge", "screen"), "/s", success_code=1)

        with task("Finalizing build"):
            os.mkdir("data")
            run("robocopy", jp("tmp", "dist", "rockjudge"), "data", "/s", success_code=1)
            shutil.rmtree("tmp")
            run("robocopy", jp(home, "control", "internal", "exe_controllers"), ".", success_code=3)

        with task("Building print server"):
            with pushd("print_server", True):
                shutil.copy(jp(home, "tools", "print.py"), ".")
                shutil.copy(jp(home, "tools", "print-config-sample.txt"), jp(".", "print-config.txt"))
                run("py", "-3", jp(home, "external-tools", "pyinstaller", "pyinstaller.py"), "-F", "print.py")
                shutil.rmtree("build")
                os.unlink("print.py")
                os.unlink("print.spec")
                shutil.copy(jp("dist", "print.exe"), ".")
                shutil.rmtree("dist")

except RuntimeError:
    pass
