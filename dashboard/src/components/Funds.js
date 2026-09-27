import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import GeneralContext from "./GeneralContext";

const Funds = () => {

  const [balance, setBalance] = useState(0);
  const [marginUsed, setMarginUsed] = useState(0);
   const [openingBalance, setOpeningBalance] = useState(0);

  const { refreshData } = useContext(GeneralContext);

  useEffect(() => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/funds`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("FUNDS:", res.data);
        setBalance(res.data.balance);
        setMarginUsed(res.data.marginUsed);
      })
      .catch((error) => {
        console.log("FUNDS ERROR:", error);
      });

  }, [refreshData]);

  return (
    <>
      <h3 className="title">Funds</h3>

      <div className="row">

       <div className="col">
          <h5>
            ₹{Number(balance).toFixed(2)}
          </h5>
          <p>Available balance</p>
        </div> 
        <div className="col">
          <h5>
            ₹{Number(marginUsed).toFixed(2)}
          </h5>
          <p>Margin used</p>
        </div>
        <div className="col">
  <h5>₹{Number(balance).toFixed(2)}</h5>
  <p>Available margin</p>
</div> 
      </div>
    </>
  );
};

export default Funds;