import { Link } from "react-router-dom";

const PromoBanner = () => (
  <div className="bg-charcoal py-2 px-4 text-center">
    <p className="text-sm font-body tracking-wide text-primary-foreground">
      <span className="font-semibold">BUY 3 GET THE 4TH FREE!</span> Use Code:{" "}
      <span className="font-semibold text-gold">BUY3GET1</span> | Free Shipping on Orders Over $75
    </p>
  </div>
);

export default PromoBanner;
