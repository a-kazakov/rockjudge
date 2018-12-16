#!/usr/bin/env python3
import json
import os
from pathlib import Path


def gen(**kwargs) -> str:
    return """
# -*- mode: python -*-

block_cipher = None

a = Analysis(['manage.py'],
             pathex=[{work_dir}],
             binaries=[],
             datas=[],
             hiddenimports={hidden_imports},
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='{exe_name}',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=False,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=False,
               name='{exe_name}')
    """.strip().format(
        **kwargs
    )


def path_to_module(path: str) -> str:
    path = path.replace("\\", "/")
    if path.startswith("./"):
        path = path[2:]
    path = path.rstrip("/")
    path = path.replace("/", ".")
    return path


def main() -> None:
    hidden_imports = json.dumps([
        path_to_module(root) + "._imports"
        for root, dirs, files in os.walk(".")
        if "_imports.py" in files
    ])
    spec = gen(
        exe_name="rockjudge",
        hidden_imports=hidden_imports,
        work_dir=json.dumps(str(Path().absolute())),
        start_script_path="manage.py",
    )
    with open("exe.spec", "wt") as f:
        f.write(spec)


if __name__ == "__main__":
    main()
