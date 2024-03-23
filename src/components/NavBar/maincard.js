import "./maincard.css";
import React, { useState, useEffect, TextInput, View } from "react";
import maincard_vid from "../../assets/maincard_vid.mp4";
import blob_1 from "../../assets/blob_1.png";
import blob_2 from "../../assets/blob2.png";
import right_arrow from "../../assets/right_arrow.png";
import letterX from "../../assets/letter_x.png";
import confetti from "../../assets/purple_confetti.png";
import blobpack from "../../assets/Untitled_design__4_-removebg-preview_upscaled_deblurred.png";
import Papa from "papaparse";
import stockListCSV from "../../tick.csv";
const MainCard = () => {
  const [text, onChangeText] = React.useState("EmailText");
  const [number, onChangeNumber] = React.useState(")");

  const [errorMessage, setErrorMessage] = useState("");
  const [stockSymbols, setStockSymbols] = useState([]);
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (value) => {
    if (selectedButtons.includes(value)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== value));
    } else if (selectedButtons.length < 3) {
      setSelectedButtons([...selectedButtons, value]);
    }
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsValidTicker(null);
  };

  const addString = () => {
    // if (inputValue.trim() !== '') {
    const newString = inputValue.trim().toUpperCase();
    if (!stockTickers.includes(newString)) {
      const newString = inputValue.toString();
      setStockTickers([...stockTickers, newString]);
      setInputValue("");
    }
    // }
  };

  const [inputValue, setInputValue] = useState("");
  const [stockTickers, setStockTickers] = useState([]);
  const [displayedIndices, setDisplayedIndices] = useState([]);

  const handleRemoveElement = (index) => {
    setStockTickers((prevArray) => prevArray.filter((_, i) => i !== index));
  };

  const [isValidTicker, setIsValidTicker] = useState(null);

  const handleInputChange2 = (event) => {
    setInputValue(event.target.value);
  };

  const checkTickerValidity = () => {
    if (inputValue.trim() === "") {
      setIsValidTicker(false); // Empty input is not a valid ticker
    } else {
      Papa.parse(stockListCSV, {
        download: true,
        header: false,
        complete: (result) => {
          const tickers = result.data.map((row) => row[0]);
          if (tickers.includes(inputValue.toUpperCase())) {
            setIsValidTicker(true);
            addString();
          } else {
            setIsValidTicker(false);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  const [response, setResponse] = useState("");

  const callLambdaFunction = async () => {
    try {
      const apiEndpoint =
        "https://ccdu4xzifesb25d223z7zfzdom0abaer.lambda-url.us-east-1.on.aws/"; // https://onvcdkettwlr4ludhpwfmte42a0yujmq.lambda-url.us-east-1.on.aws/
      const requestBody = {};
      selectedButtons.forEach((ticker, index) => {
        requestBody[`key${index + 1}`] = ticker;
      });
      stockTickers.forEach((ticker, index) => {
        requestBody[`key${index + 4}`] = ticker;
      });

      console.log("Request Body:", JSON.stringify(requestBody));

      const response = await fetch(apiEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        // Add request body if needed
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Lambda response:", data);
    } catch (error) {
      console.error("Error calling Lambda function:", error);
    }
  };

  const generateTables = () => {
    const tables = [];
    for (let i = 0; i < stockTickers.length; i += 3) {
      const tableElements = stockTickers.slice(i, i + 3).map((str, index) => (
        <th key={index} className="generated-text-box">
          {str}
          <img
            src={letterX}
            alt="logo"
            id="letterX"
            style={{ cursor: "pointer" }}
            className="letterX"
            onClick={() => handleRemoveElement(i + index)}
          ></img>
        </th>
      ));
      tables.push(
        <table className="center" key={i}>
          <th>{tableElements}</th>
        </table>
      );
    }
    return tables;
  };

  useEffect(() => {
    const csvFilePath = "../tick.csv";
    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        const symbols = result.data.map((stock) => stock.Symbol);
        setStockSymbols(symbols);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

  return (
    <div className="MainCard">
      <div className="backgroundVideo1">
        <div className="MainText">
          <div className="Landing">
            <h2>
              NEWSLETTERS<br></br>REIMAGINED
            </h2>
            <p>
              Weekly market and portfolio reports for YOU, crafted with cutting
              edge AI
            </p>
          </div>

          <div className="wrapper">
            <input type="text" placeholder="Enter your email" />
            <button
              onClick={() =>
                document
                  .getElementById("middle")
                  .scrollIntoView(false, { behavior: "smooth", speed: 1000 })
              }
            >
              <img
                src={right_arrow}
                alt="logo"
                id="left_logo"
                className="right_arrow"
              />
            </button>
          </div>
        </div>

        <div className="video-container">
          <video src={maincard_vid} autoPlay loop muted />
          <div className="gradient-overlay"></div>
        </div>
      </div>
      <div className="top-gradient-overlay"></div>
      <div className="MiddleSlide">
        <h1 className="CenterTitle"> Choose your sectors </h1>
        <table className="center">
          <tr>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Financial")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Financial")}
              >
                Financial 💰
              </button>{" "}
            </th>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Technology")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Technology")}
              >
                Technology 🤖
              </button>{" "}
            </th>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Healthcare")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Healthcare")}
              >
                Healthcare 🏥
              </button>{" "}
            </th>
          </tr>
          <tr>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Industrials")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Industrials")}
              >
                Industrials 🏭
              </button>{" "}
            </th>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Energy")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Energy")}
              >
                Energy 🔋
              </button>{" "}
            </th>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Communication")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Communication")}
              >
                Communication 📱
              </button>{" "}
            </th>
          </tr>
          <tr>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Materials")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Materials")}
              >
                Materials 🪵
              </button>{" "}
            </th>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Real Estate")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Real Estate")}
              >
                Real Estate 🏠
              </button>{" "}
            </th>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Utilities")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Utilities")}
              >
                Utilities ⚡
              </button>{" "}
            </th>
          </tr>
        </table>
        <table className="center">
          <tr>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Consumer Staples")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Consumer Staples")}
              >
                Consumer Staples 💰
              </button>{" "}
            </th>
            <th>
              {" "}
              <button
                className={
                  selectedButtons.includes("Consumer Discretionary")
                    ? "button1selected"
                    : "button1"
                }
                onClick={() => handleButtonClick("Consumer Discretionary")}
              >
                Consumer Discretionary 💰
              </button>{" "}
            </th>
          </tr>
        </table>

        <div className="wrapper2">
          <button
            onClick={() =>
              document
                .getElementById("last")
                .scrollIntoView(false, { behavior: "smooth", speed: 1000 })
            }
            className="wrapper_button_2"
          >
            {/* <span>&#8594;</span> */}
            <img
              src={right_arrow}
              alt="logo"
              id="right_arrow2"
              className="right_arrow2"
            />
          </button>
        </div>

        <div className="bottomOfPage" id="middle"></div>
      </div>

      {/* 
            <div class = "blob_container6">
            <img src = {blob_1} alt="logo" id = "left_logo" className = 'blobs6'/>
            </div> */}

      <div className="LastSlide">
        <h1 className="CenterTitle"> Enter Your Top Stocks </h1>
        <img src={blobpack} class="blobMob"></img>
        <div className="wrapper4">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a stock"
          />
          <button onClick={checkTickerValidity} className="add_btn">
            Add
          </button>
        </div>
        <div class="down">
          {" "}
          {isValidTicker === false && (
            <p>{inputValue} is not a valid stock ticker.</p>
          )}
          <div>{generateTables()}</div>
        </div>

        <div className="wrapper3">
          <button
            onClick={() => {
              document
                .getElementById("last-extra")
                .scrollIntoView(false, { behavior: "smooth", speed: 1000 });
              callLambdaFunction();
            }}
            className="wrapper_button_3"
          >
            {/* TOOK OUT LAMBDA CALL */}
            {/* <span>&#8594;</span> */}
            <img
              src={right_arrow}
              alt="logo"
              id="right_arrow3"
              className="right_arrow3"
            />
          </button>
        </div>

        <div className="bottomOfPage" id="last" />
      </div>

      <div className="LastSlide-extra">
        <h1 className="CenterTitle-final">
          That's it!<br></br>Check your e-mail for your first finbit!{" "}
        </h1>

        <img src={confetti} alt="logo" id="logo" className="confetti" />

        <div id="last-extra" />
      </div>
    </div>
  );
};

export default MainCard;
