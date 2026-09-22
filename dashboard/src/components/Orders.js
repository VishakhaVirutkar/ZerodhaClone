

import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {

  const [allOrders, setAllOrders] = useState([]);


  useEffect(() => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/allOrders`, {
       withCredentials: true,
       })
      .then((res) => {

        console.log("ORDERS:", res.data);

        setAllOrders(res.data);

      })
      .catch((error) => {

        console.log("Error fetching orders:", error);

      });

  }, []);


  return (
    <>
      <h3 className="title">
        Orders ({allOrders.length})
      </h3>


      <div className="order-table">

        <table>

          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Mode</th>
            </tr>
          </thead>


          <tbody>

            {allOrders.map((order, index) => (

              <tr key={order._id || index}>

                <td>{order.name}</td>

                <td>{order.qty}</td>

                <td>
                  {Number(order.price).toFixed(2)}
                </td>

                <td
                  className={
                    order.mode === "BUY"
                      ? "profit"
                      : "loss"
                  }
                >
                  {order.mode}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </>
  );
};

export default Orders;