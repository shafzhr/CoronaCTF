"""
    how to encrypt aes key by someone else rsa public key ?
    rsa_pub_key = RSA.importKey(text_data_of_rsa_public_key, passphrase=None)
    rsa_pub_cipher = PKCS1_OAEP.new(rsa_pub_key)
    aes_key_after_sha = hashlib.sha256("SECRET-HERZOG-AES-KEY".encode()).digest()
    encrypted_aes = rsa_pub_cipher.encrypt(aes_key_after_sha)
"""

import base64
import hashlib
from Crypto import Random
from Crypto.Cipher import AES


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


def create_aes_cipher(key):
    key = hashlib.sha256(key.encode()).digest()
    cipher = AESCipher(key)
    return cipher