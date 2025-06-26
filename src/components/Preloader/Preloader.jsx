import React from "react";
import "./Preloader.css";

function Preloader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="preloader">
      <i className="preloader__circle"></i>
      <p className="preloader__text">Procurando notícias...</p>
    </div>
  );
}

export default Preloader;
