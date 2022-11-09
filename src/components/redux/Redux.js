import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decNumber, incNumber } from "./actions";
import "./redux.css";

const Redux = () => {
  const storeState = useSelector((state) => state.changeTheNumber);
  const dispatch = useDispatch();
  console.log(storeState);
  return (
    <div className="container">
      <h1>Increment/Decrement counter</h1>
      <h4>using React and Redux</h4>

      <div className="quantity">
        <a
          href="#ads"
          className="quantity__minus"
          title="Decrement"
          onClick={() => dispatch(decNumber())}
        >
          <span>-</span>
        </a>
        <input
          name="quantity"
          type="text"
          className="quantity__input"
          value={storeState}
        />
        <a
          href="#ads"
          className="quantity__plus"
          title="Increment"
          onClick={() => dispatch(incNumber(5))}
        >
          <span>+</span>
        </a>
      </div>
    </div>
  );
};

export default Redux;
