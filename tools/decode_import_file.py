import inspect
import json
import os
import sys


currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
parentdir = os.path.dirname(currentdir)
sys.path.insert(0,parentdir)


def main():
    from protection.import_file_protector import decode
    src_file, dst_file = sys.argv[1:]
    with open(src_file, "rt", encoding="utf-8") as f_in:
        with open(dst_file, "wt", encoding="utf-8") as f_out:
            data = decode(f_in.read())
            f_out.write(json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True))


if __name__ == "__main__":
    main()
