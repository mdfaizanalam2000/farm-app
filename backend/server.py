from pymongo import MongoClient

try:
    def connect_to_mongodb():
        CONNECTION_STRING = "mongodb://localhost:27017"
        client = MongoClient(CONNECTION_STRING)
        db = client['knowledgelens']
        print("Connection to database is successful")
        return client,db
except:
    print("Connection to database failed")