import React from "react";
function LeftSection({
  imageUrl,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-6 p-5">
          <img src={imageUrl} />
        </div>
        <div className="col-1"></div>
        <div className="col-5 p-5 mt-4 ">
          <h1 className="fs-3">{productName}</h1>
          <p>{productDescription}</p>
          <div className="p-2">
            <a href={tryDemo}>
              {tryDemo} <i class="fa-solid fa-right-long"></i>
            </a>
            <a href={learnMore} style={{ marginLeft: "50px" }}>
              {learnMore}{" "}
            </a>
          </div>
          <div className="mt-4">
            <a href={googlePlay}>
              <img src="media/images/googlePlayBadge.svg" />
            </a>
            <a href={appStore} style={{ marginLeft: "20px" }}>
              <img src="media/images/appStoreBadge.svg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
