import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const [balance, setBalance] = useState(0);
  const [marginUsed, setMarginUsed] = useState(0);
  const [openingBalance, setOpeningBalance] = useState(0);

  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);

  const { refreshData } = useContext(GeneralContext);

  useEffect(() => {
    // Fetch funds
    axios
      .get(`${process.env.REACT_APP_API_URL}/funds`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("SUMMARY FUNDS:", res.data);

        setBalance(Number(res.data.balance));
        setMarginUsed(Number(res.data.marginUsed));
        setOpeningBalance(Number(res.data.openingBalance));
      })
      .catch((error) => {
        console.log("SUMMARY FUNDS ERROR:", error);
      });

    // Fetch holdings
    axios
      .get(`${process.env.REACT_APP_API_URL}/addHoldings`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("SUMMARY HOLDINGS:", res.data);

        setHoldings(res.data);
      })
      .catch((error) => {
        console.log("SUMMARY HOLDINGS ERROR:", error);
      });

    // Fetch positions
    axios
      .get(`${process.env.REACT_APP_API_URL}/addPositions`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("SUMMARY POSITIONS:", res.data);

        setPositions(res.data);
      })
      .catch((error) => {
        console.log("SUMMARY POSITIONS ERROR:", error);
      });
  }, [refreshData]);

  // -------------------------
  // HOLDINGS CALCULATIONS
  // -------------------------

  const totalInvestment = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );

  const currentHoldingsValue = holdings.reduce(
    (total, stock) =>
      total +
      Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );

  const holdingsPnl = currentHoldingsValue - totalInvestment;

  // -------------------------
  // POSITIONS CALCULATIONS
  // -------------------------

  const positionsValue = positions.reduce(
    (total, stock) =>
      total +
      Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );

  const positionsPnl = positions.reduce(
    (total, stock) =>
      total +
      (Number(stock.price || 0) - Number(stock.avg || 0)) *
        Number(stock.qty || 0),
    0
  );

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      {/* ================= EQUITY ================= */}

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{balance.toFixed(2)}</h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>₹{marginUsed.toFixed(2)}</span>
            </p>

            <p>
              Opening balance <span>₹{Number(openingBalance).toFixed(2)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />

        {/* ================= HOLDINGS ================= */}

        <div className="section">
          <span>
            <p>Holdings ({holdings.length})</p>
          </span>

          <div className="data">
            <div className="first">
              <h3 className={holdingsPnl >= 0 ? "profit" : "loss"}>
                ₹{holdingsPnl.toFixed(2)}
              </h3>

              <p>P&L</p>
            </div>

            <hr />

            <div className="second">
              <p>
                Current Value{" "}
                <span>₹{currentHoldingsValue.toFixed(2)}</span>
              </p>

              <p>
                Investment{" "}
                <span>₹{totalInvestment.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <hr className="divider" />
        </div>

        {/* ================= POSITIONS ================= */}

        <div className="section">
          <span>
            <p>Positions ({positions.length})</p>
          </span>

          <div className="data">
            <div className="first">
              <h3 className={positionsPnl >= 0 ? "profit" : "loss"}>
                ₹{positionsPnl.toFixed(2)}
              </h3>

              <p>P&L</p>
            </div>

            <hr />

            <div className="second">
              <p>
                Current Value{" "}
                <span>₹{positionsValue.toFixed(2)}</span>
              </p>

              <p>
                Positions P&L{" "}
                <span>₹{positionsPnl.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <hr className="divider" />
        </div>
      </div>
    </>
  );
};

export default Summary;