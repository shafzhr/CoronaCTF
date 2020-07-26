import sys
import socket
import threading

from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Cipher import AES

import base64
from requests import get as requests_get
***REMOVED***


t_lock = threading.Lock()

SERVER_LOG = "RSA_server.log"
PROGRESS_LOG = "progression.log"

RSA_KEY_SIZE = 1024 // 8
AES_KEY_SIZE = 256 // 8
RSA_CIPHER_BLOCK_SIZE = RSA_KEY_SIZE

SERVER_IP = '0.0.0.0'

PUB_IP = requests_get('https://api.ipify.org').text
URL_PATHS = {1: 'http://' + PUB_IP + '/b0a01904da3d14582d58806aa7e922bc.html',
             2: 'http://' + PUB_IP + "/8d8ee8463da0c15c33e260d0a1b8dbfe.html"***REMOVED***

progress_by_ip = {***REMOVED***


class AESCipher(object):

    def __init__(self, key):
        self.bs = AES.block_size
        self.key = key

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
***REMOVED*** base64.b64encode(iv + cipher.encrypt(raw.encode()))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
***REMOVED*** self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
***REMOVED*** s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
***REMOVED*** s[:-ord(s[len(s) - 1:])]


def send_encrypted(cipher, sock, msg):
    data_to_send = cipher.encrypt(msg)
    sock.send(str(len(data_to_send)).zfill(10).encode() + data_to_send)


def write_to_log(file, attr, s):
    global t_lock
    s = str(datetime.now()) + "    " + s + '\n'
    with t_lock:
        with open(file, attr) as f:
    ***REMOVED***


def recv_amount(sock, size):
    buffer = b''
    while size:
        new_bufffer = sock.recv(size)
        if not new_bufffer:
***REMOVED*** None
        buffer += new_bufffer
        size -= len(new_bufffer)
    return buffer


def send_by_size(sock, msg):
    sock.send(str(len(msg)).zfill(10).encode() + msg)


def handle_client(client_socket, addr):
    max_phase = 0
    name = ""
    try:
        name = client_socket.recv(1024)

        random_generator = Random.new().read
        key = RSA.generate(RSA_KEY_SIZE * 8, random_generator)  # generate pub and priv key

        # Send the first message to the client.
        first_link = URL_PATHS.get(1)
        send_by_size(client_socket, first_link.encode())
        max_phase += 1

        # Wait for the client to confirm.
        response = recv_amount(client_socket, 7)
        if response is None:
***REMOVED***
        response = response.decode()
        while response != "CONFIRM":
            response = recv_amount(client_socket, 7)
            if response is None:
    ***REMOVED***
            response = response.decode()

        # Continue communication by sending the public key to the client.
        send_by_size(client_socket, key.publickey().exportKey(format='PEM', passphrase=None, pkcs=1))
        max_phase += 1

        # receive symmetrical key
        response = recv_amount(client_socket, RSA_CIPHER_BLOCK_SIZE)
        if response is None:
***REMOVED***
        # decrypt the symmetrical key
        cipher = PKCS1_OAEP.new(key)
        try:
            symmetrical_key = cipher.decrypt(response)
            if len(symmetrical_key) != AES_KEY_SIZE:
                send_by_size(client_socket, "Wrong input :(".encode())
    ***REMOVED***
        except TypeError:
            send_by_size(client_socket, "Wrong input :(".encode())
***REMOVED***

        # create cipher object
        aes_cipher = AESCipher(symmetrical_key)

        # continue to ssh
        send_encrypted(aes_cipher, client_socket, URL_PATHS.get(2))

    except socket.error:
***REMOVED***

    finally:
        client_socket.close()
        with t_lock:
            if addr not in progress_by_ip.keys():
                progress_by_ip[addr] = {***REMOVED***
                progress_by_ip[addr][name] = max_phase
    ***REMOVED***
                if name not in progress_by_ip[addr].keys():
                    progress_by_ip[addr][name] = 0
                progress_by_ip[addr][name] = max(progress_by_ip[addr][name], max_phase)
        write_to_log(PROGRESS_LOG, 'a', str(progress_by_ip[addr][name]))


def main(port):
    server_socket = socket.socket()
    server_socket.bind((SERVER_IP, port))
    server_socket.listen(30)

    threads = []
    try:
        while True:
            client_socket, client_address = server_socket.accept()
            t1 = threading.Thread(target=handle_client, args=(client_socket, client_address[0]))
            threads.append(t1)
            t1.start()
    finally:
        for t in threads:
            t.join()
        server_socket.close()


***REMOVED***
    if len(sys.argv) < 2:
        write_to_log(SERVER_LOG, 'a', "Invalid use. Plese give an argument for the port")
        exit()

    try:
        port = int(sys.argv[1])
    except ValueError:
        write_to_log(SERVER_LOG, 'a', "The port has to be a number")
        exit()
    if not (0 <= port <= 65535):
        write_to_log(SERVER_LOG, 'a', "The port has to be a number between 0 to 65535")
        exit()
    
    with open(SERVER_LOG, 'w'):
        pass
    with open(PROGRESS_LOG, 'w'):
        pass
    
    main(port)
