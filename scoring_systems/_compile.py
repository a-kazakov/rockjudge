import os
import shutil

from distutils.core import setup
from distutils.extension import Extension
from Cython.Build import cythonize


extensions = [
    Extension("common", ["common.py"]),
    Extension("rosfarr.implementation", ["rosfarr/implementation/*"]),
    Extension("skating.implementation", ["skating/implementation/*"]),
]

setup(
    ext_modules=cythonize(extensions),
)

shutil.rmtree("build")
os.unlink("common.py")
os.unlink("common.c")
# TODO