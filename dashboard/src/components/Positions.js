import React, { useState, useEffect } from "react";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";
// import {positions} from "../data/data.js";
import axios from "axios";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  const { openSellWindow } = useContext(GeneralContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/addPositions`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setAllPositions(res.data);
      });
  }, []);

  const totalPositionValue = allPositions.reduce(
  (total, stock) =>
    total + Number(stock.price || 0) * Number(stock.qty),
  0
);

const totalPositionPnl = allPositions.reduce(
  (total, stock) =>
    total +
    (Number(stock.price || 0) - Number(stock.avg || 0)) *
      Number(stock.qty),
  0
);
  return (
    <>
      <h3 className="title">Postions ({allPositions.length})</h3>
      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
            <th>Action</th>
          </tr>

          {allPositions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>

                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>

                <td className={dayClass}>{stock.day}</td>
                <td>
                  <button
                    className="btn btn-blue"
                    onClick={() => {
                      console.log("POSITION SELL CLICKED:", stock.name);
                      openSellWindow(stock.name, "MIS");
                    }}
                  >
                    Sell
                  </button>
                </td>
              </tr>

    
            );
           
          })}
        </table>
      </div>
      <div className="row">

  <div className="col">
    <h5>
      ₹{totalPositionValue.toFixed(2)}
    </h5>
    <p>Current value</p>
  </div>

  <div className="col">
    <h5
      className={totalPositionPnl >= 0 ? "profit" : "loss"}
    >
      ₹{totalPositionPnl.toFixed(2)}
    </h5>
    <p>P&L</p>
  </div>

</div>
    </>
  );
};

export default Positions;
