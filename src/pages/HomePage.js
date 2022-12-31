import React from "react";

import Header from "parts/Header";
import Hero from "parts/HomePage/Hero";
import BrowseRoom from "parts/HomePage/BrowseRoom";
import JusrArrive from "parts/HomePage/JusrArrive";
import Clients from "parts/Clients";
import Sitemap from "parts/Sitemap";
import Footer from "parts/Footer";
import Document from "parts/Document";

export default function HomePage() {
  return (
    <Document>
      <Header position={"absolute"} />
      <Hero />
      <BrowseRoom />
      <JusrArrive />
      <Clients />
      <Sitemap />
      <Footer />
    </Document>
  );
}
