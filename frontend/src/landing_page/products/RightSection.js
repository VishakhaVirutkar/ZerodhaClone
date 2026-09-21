import React from "react";
function RightSection({imageUrl, productName, productDescription, learnMore}) {
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-6 mt-5 p-5">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <a href={learnMore}>{learnMore}</a>
        </div>
        <div className="col-6">
          <img src={imageUrl} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
