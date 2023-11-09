import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sun from "../../assets/images/clearly.png";
import moon from "../../assets/images/moon.jpg";
import cloud from "../../assets/images/cloud.png";
import broken_cloud from "../../assets/images/brokencloud.png";
import overcast_cloud from "../../assets/images/overcasticon.png";
import scattered_cloud from "../../assets/images/scattered.png";
import rain from "../../assets/images/rain.png";
import rainstorm from "../../assets/images/rainstorm.png";
import misticon from "../../assets/images/misticon.avif";
import snowy from "../../assets/images/snowy.png";
import strongsnowy from "../../assets/images/strongsnow.webp";
import nightback from "../../assets/images/night.jpg";
import sunback from "../../assets/images/sunimage.jpg";
import "./Home.css";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [checkValue, setCheckValue] = useState(false);
  const [infoData, setInfoData] = useState<weatherinfo | undefined>();
  const Apikey = "01c5fa388a85b03b1c290ed445f704f8";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter"){
       getData()
    };
  };
  let currentHours = Number(new Date().getHours());
  let currentDate=new Date()
  interface weatherinfo {
    cod: string;
    weather: {
      description: string;
    }[];
    wind: {
      speed: string;
    };
    main: {
      temp: string;
      humidity: string;
    };
  }
  const getData = () => {
    var check = false;
    var element: number | undefined;
    for (let index = 0; index < inputValue.length; index++) {
      element = inputValue.charCodeAt(index);
      if (
        (element >= 65 && element <= 90) ||
        (element >= 97 && element <= 122) ||
        element == 231 || element == 199 ||
        element == 601 || element == 399 ||
        element == 287 || element == 305 ||
        element == 304 || element == 350 ||
        element == 351 ||  element == 246 ||
        element == 252 || element==32
      ) {
        check = true;
      } else {
        check = false;
        break;
      }
    }
    if (inputValue !== "" && check == true) {
      setCheckValue(true);
      check = false;
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=${Apikey}`
      )
        .then((response) => response.json())
        .then((data) => setInfoData(data))
        .catch((error) => console.log("error", error));
    } else {
      toast.error("Şəhər adını düzgün qaydada daxil edin!");
      setInfoData(undefined);
      setCheckValue(false);
    }
  };
  return (
    <section style={{backgroundImage:`url(${(currentHours>7 && currentHours<=18) ? sunback : nightback})`}}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ToastContainer
              position="top-center"
              autoClose={1500}
              theme="colored"
            />
            <h3 className="text-center  text-light fw-bold title">WEATHER APP</h3>
            <center>
              <div className="card-weather">
                <div className="card-header">
                  <i className={`fa fa-map-marker`}></i>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search city...."
                      value={inputValue}
                      onChange={handleChange}
                      className="location"
                      onKeyDown={handleKeydown}
                    />
                    <i onClick={getData} className="fa fa-search"></i>
                  </div>
                </div>
                <span className="text-dark d-block  fw-bold title-date">{currentDate.toLocaleString()}</span>
                <div className="card-body">
                  {infoData?.cod !== "404" ? (
                    infoData?.weather[0].description == "clear sky" &&(currentHours>=0 && currentHours<=7)  ? (
                      <img src={moon} alt="" />
                    ) : infoData?.weather[0].description == "clear sky" &&(currentHours>7 && currentHours<=18)  ? (
                      <img src={sun} alt="" />
                    ) :infoData?.weather[0].description == "clear sky" &&(currentHours>18 && currentHours<=24)  ? (
                      <img src={moon} alt="" />
                    ): infoData?.weather[0].description == "few clouds" ? (
                      <img src={cloud} alt="" />
                    ) : infoData?.weather[0].description == "broken clouds" ? (
                      <img src={broken_cloud} alt="" />
                    ) : infoData?.weather[0].description ==
                      "overcast clouds" ? (
                      <img src={overcast_cloud} alt="" />
                    ) : infoData?.weather[0].description ==
                      "scattered clouds" ? (
                      <img src={scattered_cloud} alt="" />
                    ) : infoData?.weather[0].description == "light rain" ? (
                      <img src={rain} alt="" />
                    ) :infoData?.weather[0].description == "thunderstorm with light rain" ? (
                      <img src={rainstorm} alt="" />
                    ):
                    infoData?.weather[0].description ==
                      "light intensity shower rain" ? (
                      <img src={rain} alt="" />
                    ) : infoData?.weather[0].description == "light snow" ? (
                      <img src={snowy} alt="" />
                    ) : infoData?.weather[0].description == "snow" ? (
                      <img src={strongsnowy} alt="" />
                    ) : infoData?.weather[0].description == "mist" ? (
                      <img src={misticon} alt="" />
                    ) : infoData?.weather[0].description == "smoke" ? (
                      <img src={misticon} alt="" />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <p className="temperature">
                    <span>
                      {infoData?.cod !== "404" &&
                      infoData?.main.temp !== undefined
                        ? Math.round(Number(infoData?.main?.temp))
                        : ""}
                    </span>
                    {infoData?.cod !== "404" &&
                    infoData?.main.temp !== undefined ? (
                      <sup> &#8451;</sup>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="statusweather">
                    {infoData?.cod !== "404"
                      ? infoData?.weather[0].description
                      : "Bu adda şəhər tapılmadı!!!"}
                  </p>
                </div>
                <div className="card-footer">
                  <div className="otherinformation">
                    <div className="humidtiy">
                      <div className="row">
                        <div className="col-md-4 col-sm-4 col-4">
                          {checkValue == true && infoData?.cod !== "404" ? (
                            <i className="fa fa-tint" aria-hidden="true"></i>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-6 col-sm-6 col-6">
                          <p>
                            {infoData?.cod !== "404" &&
                            infoData?.main.temp !== undefined
                              ? infoData?.main?.humidity + "%"
                              : ""}
                          </p>
                          <span>
                            {infoData?.cod !== "404" &&
                            infoData?.main.temp !== undefined
                              ? "humidity"
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="windy">
                      <div className="row">
                        <div className="col-md-4 col-sm-4 col-4">
                          {infoData?.cod !== "404" && checkValue == true ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              className="svg-icon"
                              viewBox="0 0 512 512"
                            >
                              <path
                                d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3
                         32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43
                          96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3
                           32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32
                            14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 
                            96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3
                           32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"
                              />
                            </svg>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="col-md-8 col-sm-8 col-8">
                          <p>
                            {infoData?.cod !== "404" &&
                            infoData?.main.temp !== undefined
                              ? infoData?.wind?.speed + "km/h"
                              : ""}{" "}
                          </p>
                          <span>
                            {infoData?.cod !== "404" &&
                            infoData?.main.temp !== undefined
                              ? "wind speed"
                              : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
