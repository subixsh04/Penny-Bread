import os
import pandas as pd
import mysql.connector

conn = mysql.connector.connect(
    host = "localhost",
    port = 3307,
    user = "root",
    password = "ishaSalvatore@1974",
    database = "groceryApp"
)

cursor = conn.cursor()