import React, { useState, useEffect } from "react";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";
// import {holdings} from "../data/data.js";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  const { openSellWindow } = useContext(GeneralContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/addHoldings`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setAllHoldings(res.data);
      });
  }, []);

  const totalInvestment = allHoldings.reduce(
  (total, stock) =>
    total + Number(stock.avg) * Number(stock.qty),
  0
);

const currentValue = allHoldings.reduce(
  (total, stock) =>
    total + Number(stock.price || 0) * Number(stock.qty),
  0
);

const totalPnl = currentValue - totalInvestment;

const totalPnlPercentage =
  totalInvestment > 0
    ? (totalPnl / totalInvestment) * 100
    : 0;

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255,99,132,0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
            <th>Action</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = Number(stock.price || 0) * Number(stock.qty);
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{Number(stock.avg).toFixed(2)}</td>
                <td>{Number(stock.price || 0).toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={profClass}>{stock.net}</td>
                <td className={dayClass}>{stock.day}</td>
                <td>
                  <button
                    className="btn btn-blue"
                    onClick={() => {
                      console.log("HOLDING SELL CLICKED:", stock.name);
                      openSellWindow(stock.name, "CNC");
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
      ₹{totalInvestment.toFixed(2)}
    </h5>
    <p>Total investment</p>
  </div>

  <div className="col">
    <h5>
      ₹{currentValue.toFixed(2)}
    </h5>
    <p>Current value</p>
  </div>

  <div className="col">
    <h5 className={totalPnl >= 0 ? "profit" : "loss"}>
      ₹{totalPnl.toFixed(2)}
      {" "}
      ({totalPnlPercentage.toFixed(2)}%)
    </h5>
    <p>P&L</p>
  </div>

</div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
