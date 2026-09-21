import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from "./landing_page/home/HomePage";
import SignUp from "./landing_page/signup/SignUp"
import Login from "./landing_page/login/Login"
import AboutPage from "./landing_page/about/AboutPage"
import ProductPage from "./landing_page/products/ProductPage"
import PricingPage from "./landing_page/pricing/PricingPage"
import SupportPage from "./landing_page/support/SupportPage"
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import NotFound from "./landing_page/NotFound";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Navbar/>
      <Routes>
  <Route  path="/" element={<HomePage/>}/>
  <Route  path="/signup" element={<SignUp/>}/>
   <Route path="/login" element={<Login />} />
  <Route  path="/about" element={<AboutPage/>}/>
  <Route  path="/products" element={<ProductPage/>}/>
  <Route  path="/pricing" element={<PricingPage/>}/>
  <Route  path="/support" element={<SupportPage/>}/>
  <Route  path="*" element={<NotFound/>}/>
  </Routes >
  <Footer/> 
  </BrowserRouter>
  </CookiesProvider>
);



