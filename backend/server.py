from http.server import BaseHTTPRequestHandler,HTTPServer

def run(server_class=HTTPServer, handler_class=BaseHTTPRequestHandler):
    server_address = ('0.0.0.0', 3000)
    httpd = server_class(server_address, handler_class)
    print('starting server on port 3000!')
    httpd.serve_forever()

if __name__ == "__main__":
    run()