import React from "react";
function Brokerage() {
  return (
    <div className="container p-5">
      <div className="row p-5">
        <h1 className="fs-4 mb-5">Charges explained</h1>
        <div className=" col-6 text-muted">
          <p className="mb-3">Securities/Commodities transaction tax</p>
          <p className="text-12">
            Tax by the government when transacting on the exchanges. Charged as
            above on both buy and sell sides when trading equity delivery.
            Charged only on selling side when trading intraday or on F&O.
          </p>

          <p className="text-12">
            When trading at Zerodha, STT/CTT can be a lot more than the
            brokerage we charge. Important to keep a tab.
          </p>
          <p className="mb-3">Transaction/Turnover Charges</p>
          <p className="text-12">
            Charged by exchanges (NSE, BSE, MCX) on the value of your
            transactions.
          </p>

          <p className="text-12">
            BSE has revised transaction charges in XC, XD, XT, Z and ZP groups
            to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been
            merged into a new group X w.e.f 01.12.2017)
          </p>

          <p className="text-12">
            BSE has revised transaction charges in SS and ST groups to ₹1,00,000
            per crore of gross turnover.
          </p>

          <p className="text-12">
            BSE has revised transaction charges for group A, B and other non
            exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC,
            W, T) at ₹375 per crore of turnover on flat rate basis w.e.f.
            December 1, 2022.
          </p>

          <p className="text-12">
            BSE has revised transaction charges in M, MT, TS and MS groups to
            ₹275 per crore of gross turnover.
          </p>
          <p className="mb-3">Margin Trading Facility (MTF)</p>
          <ul className="text-12">
            <li>
              MTF Interest: 0.04% per day (₹40 per lakh) on the funded amount.
              The interest is applied from T+1 day until the day MTF stocks are
              sold.
            </li>
            <li>
              MTF Brokerage: 0.3% or Rs. 20/executed order, whichever is lower.
            </li>
            <li>
              MTF pledge charge: ₹15 + GST per pledge and unpledge request per
              ISIN.
            </li>
          </ul>
        </div>
        <div className="col-6 text-muted">
          <p className="mb-3">GST</p>
          <p className="text-12">
            Tax levied by the government on the services rendered. 18% of (
            brokerage + SEBI charges + transaction charges)
          </p>
          <p className="mb-3">SEBI Charges</p>
          <p className="text-12">
            Charged at ₹10 per crore + GST by Securities and Exchange Board of
            India for regulating the markets
          </p>
          <p className="mb-3">DP (Depository participant) charges</p>
          <p className="text-12">
            ₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is
            charged on the trading account ledger when stocks are sold,
            irrespective of quantity.
          </p>

          <p className="text-12">
            Female demat account holders (as first holder) will enjoy a discount
            of ₹0.25 per transaction on the CDSL fee.
          </p>

          <p className="text-12">
            Debit transactions of mutual funds & bonds get an additional
            discount of ₹0.25 on the CDSL fee.
          </p>
          <p className="mb-3">Trading using 3-in-1 account with block functionality</p>
          <ul className="text-12">
            <li>Delivery & MTF Brokerage: 0.5% per executed order.</li>
            <li>Intraday Brokerage: 0.05% per executed order.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
