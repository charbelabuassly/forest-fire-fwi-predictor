import './App.css';
import axios from 'axios';
import { useRef, useState } from 'react';

function App() {
  const temperature = useRef();
  const rh = useRef();
  const ws = useRef();
  const rain = useRef();
  const ffmc = useRef();
  const dmc = useRef();
  const dc = useRef();
  const isi = useRef();

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  async function sendData(event) {
    event.preventDefault();
    let but_id = event.nativeEvent.submitter.id;

    if (but_id === 'submit') {
      console.log("Sending data to API...");
      
      const toSend = {
        Temperature: parseFloat(temperature.current.value),
        RH: parseFloat(rh.current.value),
        Ws: parseFloat(ws.current.value),
        Rain: parseFloat(rain.current.value),
        FFMC: parseFloat(ffmc.current.value),
        DMC: parseFloat(dmc.current.value),
        DC: parseFloat(dc.current.value),
        ISI: parseFloat(isi.current.value)
      };

      console.log(toSend);

      try {
        const response = await axios.post('http://127.0.0.1:8000/predict', toSend);
        setPrediction(response.data.prediction);
        setError(null);
        console.log("Prediction received:", response.data.prediction);
      } catch (err) {
        setError('Failed to get prediction. Please check your inputs and try again.');
        console.error(err);
        setPrediction(null);
      }
    } else {
      // Reset
      temperature.current.value = "";
      rh.current.value = "";
      ws.current.value = "";
      rain.current.value = "";
      ffmc.current.value = "";
      dmc.current.value = "";
      dc.current.value = "";
      isi.current.value = "";
      setPrediction(null);
      setError(null);
    }
  }

  return (
    <form onSubmit={sendData}>
      <div className="App">
        <div className="container">
          <h1>Forest Fire Weather Index Predictor</h1>
          <p className="subtitle">Predict FWI using weather and fire danger indices</p>

          <div className="input-section">
            <h2>Weather Parameters</h2>

            <div className="input-group">
              <label htmlFor='temperature'>Temperature (°C)*</label>
              <input 
                required 
                id='temperature' 
                type="number" 
                ref={temperature} 
                placeholder="e.g., 25.5"
              />
            </div>

            <div className="input-group">
              <label htmlFor='rh'>Relative Humidity (%)*</label>
              <input 
                required 
                id='rh' 
                type="number"  
                ref={rh} 
                placeholder="e.g., 60"
              />
            </div>

            <div className="input-group">
              <label htmlFor='ws'>Wind Speed (km/h)*</label>
              <input 
                required 
                id='ws' 
                type="number" 
                ref={ws} 
                placeholder="e.g., 15"
              />
            </div>

            <div className="input-group">
              <label htmlFor='rain'>Rain (mm)*</label>
              <input 
                required 
                id='rain' 
                type="number" 
                ref={rain} 
                placeholder="e.g., 0"
              />
            </div>
          </div>

          <div className="input-section">
            <h2>Fire Danger Indices</h2>

            <div className="input-group">
              <label htmlFor='ffmc'>FFMC (Fine Fuel Moisture Code)*</label>
              <input 
                required 
                id='ffmc' 
                type="number" 
                ref={ffmc} 
                placeholder="e.g., 85"
              />
            </div>

            <div className="input-group">
              <label htmlFor='dmc'>DMC (Duff Moisture Code)*</label>
              <input 
                required 
                id='dmc' 
                type="number" 
                ref={dmc} 
                placeholder="e.g., 20"
              />
            </div>

            <div className="input-group">
              <label htmlFor='dc'>DC (Drought Code)*</label>
              <input 
                required 
                id='dc' 
                type="number" 
                ref={dc} 
                placeholder="e.g., 100"
              />
            </div>

            <div className="input-group">
              <label htmlFor='isi'>ISI (Initial Spread Index)*</label>
              <input 
                required 
                id='isi' 
                type="number" 
                ref={isi} 
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <div className="button-group">
            <button type='submit' id="reset">Reset</button>
            <button type='submit' id='submit'>Get Prediction</button>
          </div>

          <div className="output-section">
            <h2>Prediction Result</h2>
            {error && <p className="error-message">{error}</p>}
            {prediction !== null && !error ? (
              <>
                <div className="prediction-result">{prediction}</div>
                <p className="confidence-score">Fire Weather Index (FWI)</p>
              </>
            ) : (
              <p className="prediction-placeholder">
                {error ? '' : 'Enter parameters and click predict'}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default App;