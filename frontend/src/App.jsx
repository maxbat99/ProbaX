import { useState } from "react";
import "./App.css";

function App() {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          home_team: homeTeam,
          away_team: awayTeam
        }),
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      console.error("Errore nella chiamata API:", err);
    }
  };

  return (
    <div className="app-container">
      <h1>ProbaX - Previsioni Calcio</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Squadra Casa"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Squadra Ospite"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <button onClick={handlePredict}>Prevedi</button>
      </div>
      {prediction && (
        <div className="result-container">
          <h2>{prediction.home_team} vs {prediction.away_team}</h2>
          <p>Probabilità vittoria casa: {prediction.home_win}%</p>
          <p>Probabilità pareggio: {prediction.draw}%</p>
          <p>Probabilità vittoria ospite: {prediction.away_win}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
