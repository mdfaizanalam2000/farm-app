import server
from fastapi import FastAPI,Body
from fastapi.middleware.cors import CORSMiddleware
import json

app=FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

client,db=server.connect_to_mongodb()
collection=db["interns_data"]

@app.post("/addIntern")
def read_root(emp=Body()):
   try:
    data=json.loads(emp)
    collection.insert_one(data)
    return {"message":"success"}
   except:
       return {"message":"error"}

@app.on_event("shutdown")
def close_connection():
   client.close()
   print("connection closed")