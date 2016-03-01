from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import urllib.parse
import subprocess as sp
import os
import re


hostName = "127.0.0.1"
hostPort = 5949


def load_config():
    try:
        with open("print-config.txt", "rt", encoding="utf-8-sig") as f:
            index = {}
            for line in f.readlines():
                line = line.split(";")[0].strip()
                if not re.match(r"^\[[A-Z]+\][^\]]*$", line):
                    continue
                match = re.match(r"^\[(.+?)\](.*)$", line)
                index[match.group(1).strip().lower()] = match.group(2).strip()
            ok = True
            if "downloads" not in index:
                ok = False
                print("ERROR: Missing [DOWNLOADS] section in config file.")
            if "word" not in index:
                ok = False
                print("ERROR: Missing [WORD] section in config file.")
            if index["downloads"] == "":
                ok = False
                print("ERROR: Downloads path is not set. Please set it print-config.txt.")
            if index["word"] == "":
                ok = False
                print("ERROR: MS Word path is not set. Please set it print-config.txt.")
            if not ok:
                return None
            return {
                "downloads": index["downloads"],
                "word": index["word"],
            }
    except FileNotFoundError:
        print("Config file not found.")
        return None
    except:
        print("Config file is incorrect.")
        return None

config = load_config()


class MyServer(BaseHTTPRequestHandler):
    def do_print(self, filename, copies):
        global config
        path = os.path.join(config["downloads"], filename)
        for _ in range(50):
            if not os.path.exists(path):
                time.sleep(0.2)
                continue
            for idx in range(copies):
                local_path = "{}_{}.docx".format(path, idx)
                sp.call(["copy", path, local_path], shell=True)
                sp.Popen([config["word"], "/q", "/n", "/mFilePrintDefault", "/mFileCloseOrExit", local_path])
            break

    def do_GET(self):
        o = urllib.parse.urlparse(self.path)
        args = urllib.parse.parse_qs(o.query)
        if o.path.startswith("/print-docx"):
            self.do_print(args["filename"][0], int(args["copies"][0]))
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(bytes("", "utf-8"))


def main():
    global config

    print("Checking downloads folder ({}): ".format(config["downloads"]), end="")
    if not os.path.exists(config["downloads"]):
        print("NOT FOUND")
        return
    if not os.path.isdir(config["downloads"]):
        print("NOT A DIRECTORY")
        return
    print("OK")

    print("Checking word executable ({}): ".format(config["word"]), end="")
    if not os.path.exists(config["word"]):
        print("NOT FOUND")
        return
    if not os.path.isfile(config["word"]):
        print("NOT A FILE")
        return
    print("OK")

    myServer = HTTPServer((hostName, hostPort), MyServer)
    print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

    try:
        myServer.serve_forever()
    except KeyboardInterrupt:
        pass

    myServer.server_close()
    print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))


if config is not None:
    main()

os.system("pause")
