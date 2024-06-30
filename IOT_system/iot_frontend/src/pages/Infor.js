import { dividerClasses } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "../styles/Infor.css";
import RFID_service from '../services/RFID_service';
import axios from "axios";
function Infor(props) {
  const [RFIDs, setRFID] = useState([]);
  const [RFIDsCount, setRFIDsCount] = useState(0); // Biến lưu số lượng giá trị

  useEffect(() => {
    // RFID_service.getRFID_List().then((res) => {
    //   setRFID(res.data);
    //   setRFIDsCount(res.data.length); // Cập nhật số lượng giá trị
    // });
    try {
      axios.get("http://localhost:8082/RFID/listRFID").then((res) => 
      {
       console.log(res.data);
       setRFID(res.data);
       setRFIDsCount(res.data.length);
      }, fail => {
     console.error(fail); // Error!
    });
  }

   catch (err) {
    alert(err);
  }
  }, []);

  return (
    <div className='Infor'>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>IDx</th>
              <th>Date</th>

            </tr>
          </thead>
          <tbody>
            {RFIDs.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.idx}</td>
                <td>{new Date(data.date).toLocaleString()}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="slot">
        {/* <p>{RFIDsCount}</p> Hiển thị số lượng giá trị */}
        {RFIDsCount > 8  ? <p>Hết slot</p> : RFIDsCount}
      </div>
    </div>

  );
}

export default Infor;