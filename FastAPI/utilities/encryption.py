import hashlib
from cryptography.fernet import Fernet

def user_password(user_password: str) -> str:
    return hashlib.sha256(user_password.encode()).hexdigest()

def encrypt_password(password: str) -> str:
    key = Fernet.generate_key()
    encrypted_password = Fernet(key).encrypt(password.encode())
    return {"encrypted_password": encrypted_password, "key": key}

def decrypt_password(encrypted_password: bytes, key:bytes) -> str:
   cipher_suite = Fernet(key)
   return cipher_suite.decrypt(encrypted_password)