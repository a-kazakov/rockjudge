import os
import shutil

from distutils.core import setup
from Cython.Build import cythonize


setup(
    ext_modules=cythonize("*.py", exclude=["__init__.py", "_compile.py", "_imports.py"]),
)

for fn in os.listdir():
    if fn.endswith(".py") and not fn.startswith("_"):
        os.unlink(fn)

for fn in os.listdir("models"):
    if fn.endswith(".pyd"):
        os.rename(os.path.join("models", fn), fn)

for fn in os.listdir():
    if os.path.isdir(fn):
        shutil.rmtree(fn)
    elif fn.endswith(".c"):
        os.unlink(fn)
