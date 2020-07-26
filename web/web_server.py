import http.server
import socketserver
from http.server import BaseHTTPRequestHandler
from urllib import parse
import json
import re
from datetime import datetime
import telegram
from telegram.error import (TelegramError, Unauthorized, BadRequest, 
                            TimedOut, ChatMigrated, NetworkError)
import pytz


# telegram notification
TOKENS = ['<TOKEN>']
BOTS = [telegram.Bot(token=token) for token in TOKENS]
PROGRESS_ID = '<CHAT_ID_1>'
FINISHERS_ID = '<CHAT_ID_2>'
CHAT_IDS = [PROGRESS_ID, FINISHERS_ID] #'1009007776',

# http
LOG_FILE_NAME = 'winners.log'
match_query = 'place'
winner_query = 'name'
QUERY_NAMES = [winner_query, match_query]
return_winner = './static/fb8d98be1265dd88bac522e1b2182140.html'
return_winner_type = 'text/html'
return_fail = './static/e11185b6e35c1b767174dc988aa0f179.jpg'
return_fail_type = 'image/jpg'

phases_ids = {
    r"/static/d7a87e55480626adf9213a6d01046938.html": 0,
    r"/static/d6918b78a05663b4a062c2d720a2a724.html": 1,
    r"/static/d18637de3979495a19b55d2983645a1b.html": 2,
    r"/static/2a1585a864d9e67627c6ae04c807a2c5.html": 3
}
phases = {
    0: r"./static/d7a87e55480626adf9213a6d01046938.html",
    1: r"./static/d6918b78a05663b4a062c2d720a2a724.html",
    2: r"./static/d18637de3979495a19b55d2983645a1b.html",
    3: r"./static/2a1585a864d9e67627c6ae04c807a2c5.html"
}

phases_valid = { r"/e70f8a011f4b9efe007e1eee2ad109ba": 0,
                 r"/b0a01904da3d14582d58806aa7e922bc": 1,
                 r"/8d8ee8463da0c15c33e260d0a1b8dbfe": 2,
                 r"/41d8400b043180a40ec96616964e4fc8": 3
}

PORT = 3000

class GetHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        return_file = return_fail
        return_file_type = return_fail_type

        path = parse.urlsplit(self.path).path
        print(path)
        queries = dict(parse.parse_qsl(parse.urlsplit(self.path).query))

        if path not in phases_valid.keys() and path != r'/answer' and path not in phases_ids.keys():
            self.send_response(404)
            self.end_headers()
            return

        elif path in phases_valid.keys():
            if 'name' not in queries.keys():
                self.send_response(404)
                self.end_headers()
                return
            name = queries['name']
            phase = phases_valid[path]
            try:
                send_progress(str(datetime.now()) + "    " + name + ' has reached to phase {}'.format(phase))
            except (TelegramError, Unauthorized, BadRequest, 
                    TimedOut, ChatMigrated, NetworkError) as e:
                    print(e)

            return_file = phases[phase]
            return_file_type = 'text/html'                
        
        else:
            if len(QUERY_NAMES) == len(queries.keys()) and all([ q in QUERY_NAMES for q in queries.keys() ]):
                place = queries[match_query]
                answer_finder = re.compile(r"(?i)^Persian.*Homa.*Carpet")
                if answer_finder.match(place):
                    winner_name = queries[winner_query]
                    log_winner(LOG_FILE_NAME, winner_name)
                    try:
                        send_all(str(get_time_timezone('Israel')) + "    " + winner_name)
                    except (TelegramError, Unauthorized, BadRequest, 
                            TimedOut, ChatMigrated, NetworkError) as e:
                            print(e)
                    return_file = return_winner 
                    return_file_type = return_winner_type

        with open(return_file, 'rb') as f:
            data = f.read()
        self.send_response(200)
        self.send_header("Content-type", return_file_type)
        self.end_headers()
        self.wfile.write(data)
        return


def log_winner(file, s):
    s = str(get_time_timezone('Israel')) + "    " + s + '\n'
    with open(file, 'a') as f:
        f.write(s)


def get_time_timezone(tz):
    tz = pytz.timezone(tz)
    return datetime.now(tz)


def send_all(msg):
    for bot in BOTS:
        for chat_id in CHAT_IDS:
            bot.sendMessage(chat_id=chat_id, text=msg)


def send_progress(msg):
    for bot in BOTS:
        bot.sendMessage(chat_id=PROGRESS_ID, text=msg)


def send_finishers(msg):
    for bot in BOTS:
        bot.sendMessage(chat_id=FINISHERS_ID, text=msg)


if __name__ == '__main__':
    Handler = GetHandler
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("serving at port", PORT)
        httpd.serve_forever()
