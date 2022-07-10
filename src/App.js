import React from "react";
import { FcReading } from "react-icons/fc";
import Todo from "./components/Todo";


function App() {
  return (
    <div className="app">
      <h1 className="mainTitle"><FcReading />Powerlist</h1>
      <Todo />
    </div>
  );
}

export default App;
