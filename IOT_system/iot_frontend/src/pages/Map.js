import React, { useState, useEffect } from "react";
import Map_ser from "../services/Map_ser";
import "../styles/Map.css";
import axios from "axios";
function Map() {
  const [chunk, setChunk] = useState([]);
  const [rfid_out, setRFIDOUT] = useState([]);


  useEffect(() => {
    try{
    axios.get("http://localhost:8082/map/lightposition").then((res) =>{

      const newChunk = Array.from(res.data);

      console.log('Chunks:', newChunk);


      setChunk(newChunk.join(''));
      
    });
    axios.get("http://localhost:8082/RFID/rfidout").then((res) =>{

      const rfid_out = Array.from(res.data);
      setRFIDOUT(rfid_out.join(''));
      
    });
  } catch (err) {
    alert(err);
  }
}, []);
return (
  <div className="Infor">
      <div className="rfid_out">
        {rfid_out}
      </div>
      <div className="Gate">
        <button>Gate</button>
      </div>
      <div className="venue1">
        <button style={{ color: chunk === "1-0" || chunk === "1-1" ? "#F00" : "#00F" }}>
          Venue 1
        </button>
      </div>
      <div className="venue2">
        <button style={{ color: chunk === "0-1" || chunk ==="1-1" ? "#F00" : "#00F" }}>
          Venue 2
        </button>
      </div>
  </div>
);
}

export default Map;