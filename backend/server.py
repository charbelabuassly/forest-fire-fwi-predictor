from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pydantic import BaseModel
import pandas as pd
import numpy as np

app = FastAPI() #creating fastapi object
class FWIRequest(BaseModel): #Creating the base model of the request for validation
    Temperature: float
    RH: float
    Ws: float
    Rain: float
    FFMC: float
    DMC: float
    DC: float
    ISI: float
     
origins = [
    "http://localhost:3000" 
]
ridge_pipeline = joblib.load("../model/ridge_pipeline.joblib")  # loading the saved pipeline
app.add_middleware( #allowing communications with the react frontend
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/health') #check api status
def check_health():
    return {'status' : 'ok'}

@app.post('/predict') #takes in parameter values, and returns the prediction
def get_prediction(data : FWIRequest):
    df = pd.DataFrame([data.dict()])
    prediction = np.expm1(ridge_pipeline.predict(df))
    return {'prediction': round(prediction[0],2)}

@app.get('/model_info') 
def get_model_info():
    return {
        'model' : 'RidgeRegression',
        'Features' : ['Temperature', 'RH', 'Ws', 'Rain', 'FFMC', 'DMC', 'DC', 'ISI'],
        'framework' : 'scikit-learn',
        'trained-on' : 'Algerian Forest Fire Dataset',
        'target' : 'FWI',
    }
    