import React from "react";

function Pricing() {
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-4">
          <h1 className="fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            See pricing <i className="fa-solid fa-right-long"></i>
          </a>
        </div>
        <div className="col-2"></div>
        <div className="col-6">
          <div className="row text-center">
            <div className="col border p-4">
              <h1 className="mb-3">
                <i className="fa-solid fa-indian-rupee-sign">0</i>
              </h1>
              <p className="mt-3">
                Free equity delivery and<br></br>
                direct mutual funds
              </p>
            </div>
            <div className="col border p-4">
              <h1 className="mb-3">
                <i className="fa-solid fa-indian-rupee-sign"></i>20
              </h1>
              <p className="mt-3">Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
