import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../components/search-bar";
import "./cities.css";
import citiesData from "./../services/indianCities.json";
import { wheatherData } from "../common/commonObjects";
import { wheatherApi } from "../services/wheatherAPI";

const Cities = () => {
  //   const d = new Date()
  const [leftCard, setLeftCard] = useState(wheatherData);
  const [middleCard, setMiddleCard] = useState(wheatherData);
  const [rightCard, setRightCard] = useState(wheatherData);
  const [searchResult, setSearchResult] = useState(wheatherData);
  const leftCardRef = useRef(null)
  const rightCardRef = useRef(null)
  const middleCardRef = useRef(null)
  const [leftCdVisibility, setLeftCdVisibility] = useState();
  const [middleCdVisibility, setMiddleCdVisibility] = useState();
  const [rightCdVisibility, setRightCdVisibility] = useState();

  const apiCall = (location, card) => {
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

        card({
          temp_c: d?.current?.temp_c,
          location_name: d?.location?.name,
          last_updated: d?.current?.last_updated,
          wind_kph: d?.current?.wind_kph,
          humidity: d?.current?.humidity,
          cloud: d?.current?.cloud,
          condition: d?.current?.condition?.text,
          temp_f: d?.current?.temp_f,
          lat: d?.location?.lat,
          lon: d?.location?.lon,
          region: d?.location?.region,
        });
      })
      .catch((e) => {
        console.log("e", e.message);
      });
  };

  const handleSelect = (result) => {
    console.log("search result: ", result);
    apiCall(result, setSearchResult);
  };

  useEffect(() => {
    apiCall("chennai", setLeftCard);
    apiCall("mumbai", setMiddleCard);
    apiCall("bangalore", setRightCard);

    const leftCardObserver = new IntersectionObserver((entries) => {
        const entry1 = entries[0]
        setLeftCdVisibility(entry1.isIntersecting)
    })
    const middleCardObserver = new IntersectionObserver((entries) => {
        const entry2 = entries[0]
        setMiddleCdVisibility(entry2.isIntersecting)
    })
    const rightCardObserver = new IntersectionObserver((entries) => {
        const entry3 = entries[0]
        setRightCdVisibility(entry3.isIntersecting)
    })

    leftCardObserver.observe(leftCardRef.current)
    middleCardObserver.observe(middleCardRef.current)
    rightCardObserver.observe(rightCardRef.current)
  }, []);

  return (
    <div id="cities">
      <div className="cityTitle">
        <h1>Cities</h1>
      </div>

      <div className="citiesStatus">
        <div ref={leftCardRef} className={`thunder ${leftCdVisibility && "fromLeft"}`}>
          <div className="thunderBg">{leftCard.condition}</div>

          <div className="cityContainer">
            <div className="cityWeather">
              <h1>{leftCard.temp_c} &#8451;</h1>
            </div>

            <div className="cityName">
              <h3>{leftCard.location_name}</h3>
              <p>{leftCard.last_updated}</p>
            </div>
          </div>
        </div>

        <div ref={middleCardRef} className={`Sunny ${middleCdVisibility && "fromTop"}`}>
          <div className="sunnyBg">{middleCard.condition}</div>

          <div className="cityContainer">
            <div className="cityWeather">
              <h1>{middleCard.temp_c} &#8451;</h1>
            </div>

            <div className="cityName">
              <h3>{middleCard.location_name}</h3>
              <p>{middleCard.last_updated}</p>
            </div>
          </div>
        </div>

        <div ref={rightCardRef} className={`Rainy ${rightCdVisibility && "fromRight"}`}>
          <div className="rainyBg">{rightCard.condition}</div>

          <div className="cityContainer">
            <div className="cityWeather">
              <h1>{rightCard.temp_c} &#8451;</h1>
            </div>

            <div className="cityName">
              <h3>{rightCard.location_name}</h3>
              <p>{rightCard.last_updated}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="searchBar">
        <SearchBar
          placeholder={"Search city"}
          data={citiesData}
          handleSelect={handleSelect}
        />
      </div>
      {searchResult.temp_c ? (
        <div className="earth-image">
            <div className="resultBody">
                
            <div className="locationInfo">
                <div className="locationInfo-data">
                <h3>{searchResult.location_name}</h3>
                <div>
                    <table className="box1">
                        <thead>
                            <tr>
                            <th>{searchResult.region}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tt">
                                <td className="r1" >Latitude</td>
                                <td className="r2">{searchResult.lat}</td>
                            </tr>
                            <tr className="tt">
                                <td className="r1">Longitude</td>
                                <td className="r2">{searchResult.lon}</td>
                            </tr>
                            <tr className="tt">
                                <td className="r1">Time</td>
                                <td className="r2">{searchResult.last_updated}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                
            </div>
            <div className="weatherInfo">

             <div className="weatherInfo-data">
                                   
                 <h1>{searchResult.temp_c} &#8451;</h1>
                <div>
                    <table className="box2">                      
                        <tbody>
                            <tr className="tt">
                                <td className="r1" >Condition</td>
                                <td className="r2">{searchResult.condition}</td>
                            </tr>
                            <tr className="tt">
                                <td className="r1">Humidity</td>
                                <td className="r2">{searchResult.humidity}</td>
                            </tr>
                            <tr className="tt">
                                <td className="r1">Wind</td>
                                <td className="r2">{searchResult.wind_kph}</td>
                            </tr>
                            <tr className="tt">
                                <td className="r1">Cloudy</td>
                                <td className="r2">{searchResult.cloud}</td>
                            </tr>
                            <tr className="tt">
                                <td className="r1">Fahrenheit</td>
                                <td className="r2">{searchResult.temp_f}</td>
                            </tr>
                            </tbody>
                    </table>
                </div>
                </div> 
            </div>

            </div>
        

        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cities;
{/* <div className="r">
                {searchResult.condition}
                </div>
            <h3>{searchResult.location_name}</h3>
            <h1>{searchResult.temp_c} &#8451;</h1>
            <p>{searchResult.last_updated}</p> */}