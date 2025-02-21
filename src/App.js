import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]); // Stores selected dropdown values

  const backendUrl = "https://bajaj-mu-navy.vercel.app/bfhl"; // Replace with your backend URL

  // Set the website title to UID
  useEffect(() => {
    document.title = "22BCS11111";
  }, []);

  // Handle JSON submission
  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post(backendUrl, parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or API error!");
    }
  };

  // Multi-select dropdown options
  const dropdownOptions = [
    { value: "alphabets", label: "Alphabets" },
    { value: "numbers", label: "Numbers" },
    { value: "highest_alphabet", label: "Highest Alphabet" },
  ];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BFHL Frontend</h1>
      
      {/* JSON Input Text Area */}
      <textarea
        rows="4"
        cols="50"
        placeholder='Enter JSON: {"data": ["A", "1", "B", "2"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {/* Show dropdown after receiving response */}
      {response && (
        <div>
          <h2>Response</h2>

          {/* Multi-Select Dropdown */}
          <Select
            isMulti
            options={dropdownOptions}
            onChange={(selected) => setSelectedOptions(selected.map((option) => option.value))}
            placeholder="Select response options..."
            styles={{ width: "300px", margin: "auto" }}
          />

          {/* Display selected responses */}
          <div style={{ marginTop: "20px" }}>
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
