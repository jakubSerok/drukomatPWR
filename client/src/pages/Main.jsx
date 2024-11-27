import React from "react";
import Hero from "../components/Hero/Hero";
import Faq from "../components/FAQ/Faq";
import Service from "../components/Services/Service";
import About from "../components/About/About";
import Map from "../components/Map/Map";
const Main = () => {
  return (
    <div>
      <Hero />
      <About />
      <Service />
      <Map />
      <Faq />
    </div>
  );
};

export default Main;
