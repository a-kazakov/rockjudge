import os
import shutil
import sys

from distutils.core import setup
from Cython.Build import cythonize


# Bulding disable due to the following bug
# https://github.com/cython/cython/issues/2753

sys.exit(0)

os.rename("__init__.py", "_init.py")

try:
    setup(
        ext_modules=cythonize(
            "*.py", exclude=[fn for fn in os.listdir() if fn.startswith("_")]
        )
    )
finally:
    os.rename("_init.py", "__init__.py")

for fn in os.listdir():
    if fn.endswith(".py") and not fn.startswith("_"):
        os.unlink(fn)

for fn in os.listdir():
    if os.path.isdir(fn):
        shutil.rmtree(fn)
    elif fn.endswith(".c"):
        os.unlink(fn)
