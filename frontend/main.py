from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Abilita CORS per permettere richieste dal frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in produzione limita al dominio di Netlify
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modello dati in input
class MatchRequest(BaseModel):
    home_team: str
    away_team: str

# Endpoint di test
@app.get("/")
def read_root():
    return {"message": "ProbaX Backend is running"}

# Endpoint predict
@app.post("/predict")
def predict(match: MatchRequest):
    # Per ora simuliamo le probabilità con valori fissi
    return {
        "home_team": match.home_team,
        "away_team": match.away_team,
        "home_win": 45,
        "draw": 30,
        "away_win": 25
    }
