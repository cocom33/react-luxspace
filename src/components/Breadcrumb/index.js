import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default function Breadcrumb({ list }) {
  return (
    <section className="bg-gray-100 py-8 px-4">
      <div className="container mx-auto">
        <ul className="breadcrumb">
          {list?.map?.((item, index) => {
            const arias =
              index === list?.lenght ? { "aria-label": "current-page" } : {};
            return (
              <li key={item.url} {...arias}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            );
          })}
          {/* <li>
            <Link to="index.html">Home</Link>
          </li>
          <li>
            <Link to="#">Office Room</Link>
          </li>
          <li>
            <Link to="#" aria-label="current-page">
              Details
            </Link>
          </li> */}
        </ul>
      </div>
    </section>
  );
}

Breadcrumb.propTypes = {
  list: propTypes.array.isRequired,
};
