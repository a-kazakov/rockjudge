from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import urllib.parse
import subprocess as sp
import os


hostName = "127.0.0.1"
hostPort = 5949


def load_config():
    try:
        with open("print-config.txt", "rt", encoding="utf-8-sig") as f:
            lines = f.read().split("\n")
            return {
                "downloads": lines[0].strip(),
                "word": lines[1].strip(),
            }
    except:
        print("Config file not found!")
        return None

config = load_config()


class MyServer(BaseHTTPRequestHandler):
    def do_print(self, filename, copies):
        global config
        path = os.path.join(config["downloads"], filename)
        for _ in range(copies):
            sp.Popen([config["word"], "/q", "/n", "/mFilePrintDefault", "/mFileCloseOrExit", path])

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
