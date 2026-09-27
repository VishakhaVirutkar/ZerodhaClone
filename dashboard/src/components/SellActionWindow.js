import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const SellActionWindow = ({ uid, product}) => {

  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  

  const { closeSellWindow, handleRefreshData } = useContext(GeneralContext);

  const handleSellClick = async () => {

    try {

      console.log("SELL DATA:", {
  name: uid,
  qty: Number(stockQuantity),
  price: Number(stockPrice),
  mode: "SELL",
  product: product,
});

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/newOrder`,
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "SELL",
          product,
        },
        {
    withCredentials: true,
  }
      );

      console.log(response.data);
        handleRefreshData();
      closeSellWindow();

    } catch (error) {

      console.log("SELL ERROR:", error);

      alert(
        error.response?.data?.message || "Sell failed"
      );
    }
  };

  return (
    <div className="buy-window" id="sell-window">

      <h3>Sell {uid}</h3>

      <div className="inputs">

        <fieldset>
          <legend>Qty.</legend>

          <input
            type="number"
            min="1"
            value={stockQuantity}
            onChange={(e) =>
              setStockQuantity(Number(e.target.value))
            }
          />
        </fieldset>


        <fieldset>
          <legend>Price</legend>

          <input
            type="number"
            step="0.05"
            value={stockPrice}
            onChange={(e) =>
              setStockPrice(Number(e.target.value))
            }
          />
        </fieldset>

      </div>


      <div className="buttons">

        <button
          className="btn btn-blue"
          onClick={handleSellClick}
        >
          Sell
        </button>

        <button
          className="btn btn-grey"
          onClick={closeSellWindow}
        >
          Cancel
        </button>

      </div>

    </div>
  );
};

export default SellActionWindow;