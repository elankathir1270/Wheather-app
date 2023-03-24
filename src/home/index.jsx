import React, { useState, useEffect } from "react";
import { wheatherData } from "../common/commonObjects";
import { wheatherApi } from "../services/wheatherAPI";

// import { wheatherCall } from "../services/wheatherCall";
import "./home.css";

const Home = () => {
  const [wheatherDetails, setWheatherDetails] = useState(wheatherData);

    const apiCall = (location) => {
      const isPosition = typeof location === "object";

      wheatherApi
        .get("/current.json", {
          params: {
            q: isPosition
              ? `${location.coords.latitude},${location.coords.longitude}`
              : location,
          },
        })
        .then((res) => {
          const d = res.data;

          setWheatherDetails({
            temp_c: d?.current?.temp_c,
            location_name: d?.location?.name,
            last_updated: d?.current?.last_updated,
            wind_kph: d?.current?.wind_kph,
            humidity: d?.current?.humidity,
            cloud: d?.current?.cloud,
            condition: d?.current?.condition?.text,
          })
        })
        .catch((e) => {
          console.log("e", e.message);
        })
    }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(apiCall, async (e) => {
        apiCall("chennai")
      });
    } else {
        apiCall("chennai")
    }
  }, []);

  return (
    <div className="home-container" id="home">
      <div className="options">
        <a className="nav-item" href="#home">Home</a>
        <a className="nav-item" href="#cities">Cities</a>
        <a className="nav-item" href="#news">News</a>
      </div>
      {wheatherDetails.temp_c ? (
        <div className="homeInput ">
          <div className="weatherStatus fromleft">
            <h1 className="temp">{wheatherDetails.temp_c}&#8451;</h1>
            <div className="location">
              <h3>{wheatherDetails.location_name}</h3>
              <p>{wheatherDetails.last_updated}</p>
            </div>
          </div>
          <div className="weatherDetails fromright">
            <table>
              <thead>
                <tr>
                  <th>WEATHER DETAILS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cloudy</td>
                  <td>{wheatherDetails.cloud}</td>
                </tr>
                <tr>
                  <td>Humidity</td>
                  <td>{wheatherDetails.humidity}</td>
                </tr>
                <tr>
                  <td>Wind</td>
                  <td>{wheatherDetails.wind_kph}</td>
                </tr>
                {/* <tr>
                  <td>Condition</td>
                  <td>{wheatherDetails.condition}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="homeInput">
          <h3>Loading...</h3>
        </div>
      )}
    </div>
  );
};

export default Home;



// useEffect(() => {
//     let responseData;
//     if (!navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(wheatherCall, async (e) => {
//         responseData = await wheatherCall("chennai");
//         console.log("responseData: ", responseData);
//       });
//     } else {
//       responseData =wheatherCall("chennai")
//     }
//     setWheatherDetails(responseData);
//   }, []);
