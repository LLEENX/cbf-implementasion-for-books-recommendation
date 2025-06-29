import mysql.connector

def connect_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",  # default Laragon kosong
        database="book-recommendation-cbf"
    )