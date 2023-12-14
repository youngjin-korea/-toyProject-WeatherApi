import styled from "styled-components";
import "./App.css";
import { useState } from "react";
import { async } from "q";
import axios from "axios";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
function App() {
  const [location, setLocation] = useState("");
  const [result, setResult] = useState({});
  const API_key = "";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`;
  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await axios({ method: "get", url: url });
        console.log(data);
        setResult(data);
      } catch (error) {
        alert(error);
      }
    }
  };
  return (
    <AppWrap>
      <div className="appContentWrap">
        <input
          style={{ width: "150px" }}
          placeholder="도시를 입력하세요...'Enter'"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          onKeyDown={searchWeather}
        />
        {/*Object.keys(객체) 메소드는 객체의 키값을 순서대로 열거한 배열로 만든다.*/}
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temperature">
              {Math.round((result.data.main.temp - 273.15) * 10) / 10}°C
            </div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
        )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

  .appContentWrap {
    left: 50%;
    top: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    padding: 20px;
  }
  input {
    padding: 16px;
    border: 2px solid black;
    border-radius: 16px;
  }
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  .city {
    font-size: 8px;
  }
  .temperature {
    font-size: 60px;
    margin-top: 8px;
  }
  .sky {
    font-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;
