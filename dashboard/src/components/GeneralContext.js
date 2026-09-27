import React, {useState} from "react";


import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow:(uid)=>{},
  closeBuyWindow:()=>{},
  openSellWindow:(uid, product)=>{},
  closeSellWindow:()=>{},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
   const [selectedProduct, setSelectedProduct] = useState("");

  const handleOpenBuyWindow = (uid) =>{
    setIsBuyWindowOpen(true);
     setIsSellWindowOpen(false);
    setSelectedStockUID(uid);
  }

  const handleCloseBuyWindow = ()=>{
     setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  }

  const handleOpenSellWindow = (uid, product) => {

    console.log("OPEN SELL WINDOW:", uid, product);

    setIsSellWindowOpen(true);
    setIsBuyWindowOpen(false);

    setSelectedStockUID(uid);
    setSelectedProduct(product);

  };

    const handleCloseSellWindow = () => {

    setIsSellWindowOpen(false);
    setSelectedStockUID("");
     setSelectedProduct("");

  };


    return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,

          openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,

      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}

       {isSellWindowOpen && (
        <SellActionWindow uid={selectedStockUID}  product={selectedProduct} />
      )}

    </GeneralContext.Provider>
  );
 }

 export default GeneralContext;