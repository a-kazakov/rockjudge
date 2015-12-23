from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import urllib.parse
import subprocess as sp
import json
import os


hostName = "127.0.0.1"
hostPort = 5949


def load_config():
    with open("print-config.txt", "rt") as f:
        return json.loads(f.read())


class MyServer(BaseHTTPRequestHandler):
    def do_print(self, filename, copies):
        config = load_config()
        path = os.path.join(config["downloads"], filename)
        for _ in range(copies):
            sp.call([config["word"], "/q", "/n", "/mFilePrintDefault", "/mFileCloseOrExit", path])

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

myServer = HTTPServer((hostName, hostPort), MyServer)
print(time.asctime(), "Server Starts - %s:%s" % (hostName, hostPort))

try:
    myServer.serve_forever()
except KeyboardInterrupt:
    pass

myServer.server_close()
print(time.asctime(), "Server Stops - %s:%s" % (hostName, hostPort))
