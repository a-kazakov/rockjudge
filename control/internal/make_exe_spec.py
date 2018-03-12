#!/usr/bin/env python3

import random
import string
import os
import sys


def gen(**kwargs) -> str:
    kwargs["hidden_imports"] = ", ".join(["'{}'".format(s) for s in kwargs["hidden_imports"]])
    return """# -*- mode: python -*-

block_cipher = pyi_crypto.PyiBlockCipher(key='{chipher}')

a = Analysis(['{start_script_path}'],
             pathex=['{work_dir}'],
             binaries=None,
             datas=None,
             hiddenimports=[{hidden_imports}],
             hookspath=None,
             runtime_hooks=None,
             excludes=None,
             win_no_prefer_redirects=None,
             win_private_assemblies=None,
             cipher=block_cipher)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          exclude_binaries=True,
          name='{exe_name}',
          debug=False,
          strip=None,
          upx=False,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=None,
               upx=False,
               name='{exe_name}')
    """.format(**kwargs)


def path_to_module(path: str) -> str:
    path = path.replace("\\", "/")
    if path.startswith("./"):
        path = path[2:]
    path = path.rstrip("/")
    path = path.replace("/", ".")
    return path


def main(code_path: str) -> None:
    try:
        cwd = os.getcwd()
        os.chdir(code_path)
        hidden_imports = [
            path_to_module(root) + "._imports"
            for root, dirs, files in os.walk(".")
            if "_imports.py" in files
        ]
    finally:
        os.chdir(cwd)

    spec = gen(
        chipher="".join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(50)),
        exe_name="rockjudge",
        hidden_imports=hidden_imports,
        work_dir=os.getcwd().replace("\\", "\\\\"),
        start_script_path="src\\\\manage.py",
    )

    with open("exe.spec", "wt") as f:
        f.write(spec)


if __name__ == "__main__":
    main(*sys.argv[1:])
