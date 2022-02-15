from flask import Flask
import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    cnx = mysql.connector.connect(user='root', password='root',
                              host='db',
                              database='HotelReviews')
    cursor = cnx.cursor()

    query = ("SELECT NOW()")
    cursor.execute(query)
    res = str(cursor.fetchall()[0][0])
    print(res)
    cnx.close()
    
    return res

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)