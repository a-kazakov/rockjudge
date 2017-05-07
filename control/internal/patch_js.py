import os
import re
import shutil


def replace(filename, regexp, repl):
    with open(filename, "rt") as f:
        data = f.read()
    data = re.sub(regexp, repl, data)
    bak_filename = "{}.bak".format(filename)
    if not os.path.exists(bak_filename):
        shutil.copy(filename, bak_filename)
    with open(filename, "wt") as f:
        f.write(data)


if __name__ == "__main__":
    replace("lz4-asm\\lz4.js", r"(\w{1,3})=\"object\"===typeof process&&[^,;]+([,;])", r"\1=1\2")
