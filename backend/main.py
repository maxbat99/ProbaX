from fastapi import FastAPI
import requests

app = FastAPI()

@app.get("/openliga/matches")
def openliga_matches(season: int = 2025):
    """
    Restituisce partite della Bundesliga da OpenLigaDB per l'anno indicato.
    Esempio: /openliga/matches?season=2025
    """
    url = f"https://www.openligadb.de/api/getmatchdata/bl1/{season}"
    response = requests.get(url)
    return response.json()
