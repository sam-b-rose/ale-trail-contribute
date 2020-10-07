import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import "./styles.css";

const DEFAULT_BREWERY = "Austin Beerworks";
const DEFAULT_CITY = "Austin, TX";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
  });
  return response.json();
}

export default function App() {
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Beer me");
  const [brewery, setBrewery] = useState("");
  const [city, setCity] = useState("");
  const handleBrewery = (e) => {
    setBrewery(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = () => {
    setDisabled(true);
    postData("https://usebasin.com/f/bd70fb096f37", {
      brewery,
      city
    })
      .then(() => {
        setBrewery("");
        setCity("");
        setButtonText("Sent");
      })
      .catch((e) => {
        console.log(e);
        setButtonText("Failed");
      })
      .finally(() => {
        setDisabled(false);
        setTimeout(() => setButtonText("Send more beer"), 1500);
      });
  };

  return (
    <section style={{ maxWidth: 680 }}>
      <TextField
        fullWidth
        label="Brewery"
        onChange={handleBrewery}
        margin="normal"
        placeholder={DEFAULT_BREWERY}
        value={brewery}
        variant="outlined"
      />
      <TextField
        fullWidth
        label={`City`}
        margin="normal"
        onChange={handleCity}
        placeholder={DEFAULT_CITY}
        value={city}
        variant="outlined"
      />
      <section>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          color="primary"
          disabled={disabled}
        >
          {buttonText}
        </Button>
      </section>
    </section>
  );
}
