import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "22BCS11111"; // Set your UID as title
  }, []);
  

  const backendUrl = "https://bajaj-mu-navy.vercel.app/bfhl"; // Your deployed backend URL

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post(backendUrl, parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API error!");
    }
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BFHL Frontend</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder='Enter JSON: {"data": ["A", "1", "B", "2"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <div>
          <h2>Response</h2>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("alphabets")}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("numbers")}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange("highest_alphabet")}
            />
            Highest Alphabet
          </label>

          <div>
            {selectedOptions.includes("alphabets") && (
              <p>Alphabets: {JSON.stringify(response.alphabets)}</p>
            )}
            {selectedOptions.includes("numbers") && (
              <p>Numbers: {JSON.stringify(response.numbers)}</p>
            )}
            {selectedOptions.includes("highest_alphabet") && (
              <p>Highest Alphabet: {JSON.stringify(response.highest_alphabet)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
