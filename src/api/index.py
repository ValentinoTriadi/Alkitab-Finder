import json
import time
from fastapi import FastAPI
from .KMPSearch import KMPSearch
from .BMSearch import BMSearch

app = FastAPI()

@app.get("/api/python")
def hello_world(text: str):
    return find_text_bm(text)

@app.get("/api/find-kmp")
def find_text_kmp(text: str):
    start = time.time()
    res = KMPSearch(text)
    return {"message": res, "time": time.time() - start}

@app.get("/api/find-bm")
def find_text_bm(text: str):
    start = time.time()
    res = BMSearch(text)
    return {"message": res, "time": time.time() - start}