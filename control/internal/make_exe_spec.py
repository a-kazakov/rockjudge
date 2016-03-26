#!/usr/bin/env python3

import random
import string
import os


def gen(**kwargs):
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
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=None,
               upx=True,
               name='{exe_name}')
    """.format(**kwargs)

spec = gen(
    chipher="".join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(50)),
    exe_name="rockjudge",
    hidden_imports=[
        'protection._imports',
        'models._imports',
        'webserver._imports',
        'scoring_systems._imports',
        'scoring_systems.rosfarr',
        'scoring_systems.rosfarr.acro',
        'scoring_systems.rosfarr.no_acro',
        'scoring_systems.rosfarr.formation',
        'scoring_systems.rosfarr.formation_acro',
        'scoring_systems.rosfarr.simplified',
        'scoring_systems.rosfarr.am_final_fw',
        'scoring_systems.rosfarr.am_final_acro',
    ],
    work_dir=os.getcwd().replace("\\", "\\\\"),
    start_script_path="src\\\\manage.py",
)

with open("exe.spec", "wt") as f:
    f.write(spec)
