import React from "react";

export default function Weather() {
  return (
    <main>
      <h1>Todays Weather</h1>
      <div className="location">
        <h2>My location: </h2>
        <p>Wagga Wagga</p>
      </div>
      <div className="temperature">
        <h2>26C</h2>
        <h3>Sunny</h3>
        <h4>L:11 / H:26</h4>
      </div>
    </main>
  );
}
