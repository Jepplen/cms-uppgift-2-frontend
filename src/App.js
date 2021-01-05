import React from "react";
//import axios from "axios";
import { GlitzClient } from '@glitz/core';
import { GlitzProvider } from '@glitz/react';
import "./App.css";
import MainPage from "./main-components/MainPage";

const glitz = new GlitzClient();

export default function App() {

  // useEffect(() => {
  //   fetchItems();
  // }, [] );

  // const fetchItems = async () => {
  //   const data = await fetch("/genres/1");
  //   const items = await data.json();
  //   console.log(items);
  // }

  return (
    <div className="App">
      <GlitzProvider glitz={glitz}>
        <MainPage />
      </GlitzProvider>
    </div>
  );
}
