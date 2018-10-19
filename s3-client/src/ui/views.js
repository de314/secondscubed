import React from "react";

import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="NotFound">
    <div className="text-center">
      <h1>Oops...</h1>
      <h3>
        There is nothing here... Try going <Link to="/">home</Link>
      </h3>
    </div>
  </div>
);
