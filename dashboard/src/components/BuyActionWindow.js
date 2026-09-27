import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [product, setProduct] = useState("CNC");

  // Get function from context
  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      console.log("BUY DATA:", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "BUY",
      });

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/newOrder`,
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
          product,
        },
        {
          withCredentials: true,
        },
      );

      console.log("BUY RESPONSE:", response.data);

      closeBuyWindow();
    } catch (error) {
      console.log("BUY ERROR:", error);

      if (error.response) {
        console.log("SERVER MESSAGE:", error.response.data.message);
      }
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="buy-window" id="buy-window">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>

            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>

          <fieldset>
  <legend>Product</legend>

  <select
    value={product}
    onChange={(e) => setProduct(e.target.value)}
  >
    <option value="CNC">CNC</option>
    <option value="MIS">MIS</option>
  </select>
</fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
  {product === "CNC"
    ? "Full amount required"
    : "5*leverage"}
</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>

          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
