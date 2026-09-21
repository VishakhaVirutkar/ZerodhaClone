import React from "react";
function Hero() {
  return (
    <section className="container-fluid " id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h4>Support portal</h4>
        <a href="">Track Tickets</a>
      </div>
      <div className="row mx-5 line ">
        <div className="col-6 p-5">
          <p className="fs-3" >Search for an answer or browse help <br/> topic to create a ticket</p>
          <input placeholder=" how do i activate account" />
          <a href="">Track account opening</a>
          <a href="">Track segment activation</a>
          <a href="">Intraday margins</a>
          <a href="">Kite user manual</a>
        </div>
        <div className="col-6 p-5">
          <p className="fs-3">Featured</p>
          <a href="">1. Current Takeovers and Delisting - January 2024</a><br/>
          <a href="">2. Latest Intraday leverages - MIS & CO</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
