import hashlib
import socket


from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Cipher import PKCS1_OAEP

from Crypto.Cipher import AES
import base64
class AESCipher(object):

    def __init__(self, key):
        self.bs = AES.block_size
        self.key = key

    def encrypt(self, raw):
        raw = self._pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return base64.b64encode(iv + cipher.encrypt(raw.encode()))

    def decrypt(self, enc):
        enc = base64.b64decode(enc)
        iv = enc[:AES.block_size]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return self._unpad(cipher.decrypt(enc[AES.block_size:])).decode('utf-8')

    def _pad(self, s):
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    @staticmethod
    def _unpad(s):
        return s[:-ord(s[len(s) - 1:])]


def recv_amount(sock, size):
    buffer = b''
    while size:
        new_bufffer = sock.recv(size)
        if not new_bufffer:
            return None
        buffer += new_bufffer
        size -= len(new_bufffer)
    return buffer


def recv_by_size(sock):
    size = int(recv_amount(sock, 10).decode())
    data = ""
    while len(data) < size:
        data += recv_amount(sock, size - len(data)).decode()
    return data


#kye for AES-128
ENC_KEY = "CYBER"
AES_KEY = hashlib.sha256(ENC_KEY.encode()).digest()
PUB_KEY_SIZE = 1024/8

#communication with the server
IP = "3.127.117.45"
IP = "127.0.0.1"
PORT = 3389
sock = socket.socket()
sock.connect((IP, PORT))

#send name
sock.send(b"<name>")

#receving first link
msg = recv_by_size(sock)
print(msg)

sock.send("CONFIRM".encode())

#receiving server public kye
key = recv_by_size(sock)
pub_key = RSA.importKey(key, passphrase=None)
cipher = PKCS1_OAEP.new(pub_key)
encrypted_aes_key = cipher.encrypt(AES_KEY)

sock.send(encrypted_aes_key)

#receiving second and link and decrypting it
response = recv_by_size(sock)
aes_cipher = AESCipher(AES_KEY)
decrypted = aes_cipher.decrypt(response)
print(decrypted)

with open('key.txt','r') as f:
    aes_new_key = f.read()
with open('cipher.txt','r') as f:
    data = f.read()

aes_new_key = hashlib.sha256(aes_new_key.encode()).digest()
new_cipher = AESCipher(aes_new_key)
final_answer = new_cipher.decrypt(data)
print (final_answer)