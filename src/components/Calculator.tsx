//** Author: Nathan Dinatale */
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import classes from "./Calculator.module.css";

//** The Calculator component reacts to a submission of the input form by calculating the surcharge */
//** And then displaying it on the screen dynamically by using useState  */
const Calculator: React.FC<{}> = (props) => {
  const inputCartRef = useRef<HTMLInputElement>(null);
  const inputDistanceRef = useRef<HTMLInputElement>(null);
  const inputAmountRef = useRef<HTMLInputElement>(null);
  const inputTimeRef = useRef<HTMLInputElement>(null);

  const [result, setResult] = useState(0);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredCartValue = parseFloat(inputCartRef.current!.value);
    const enteredDistanceValue = parseInt(inputDistanceRef.current!.value);
    const enteredAmountValue = parseInt(inputAmountRef.current!.value);
    const enteredTimeValue = inputTimeRef.current!.value;

    //** Calculating the surcharge given the inputs */
    let totalSurcharge = 0.0;

    if (enteredCartValue < 10) {
      const valueSurcharge = 10 - enteredCartValue;
      totalSurcharge += valueSurcharge;
    }

    let distanceSurcharge = 2;
    if (enteredDistanceValue > 1000) {
      distanceSurcharge += Math.ceil((enteredDistanceValue - 1000) / 500);
    }
    totalSurcharge += distanceSurcharge;

    let amountSurcharge = 0.0;
    if (enteredAmountValue >= 5) {
      amountSurcharge = (enteredAmountValue - 4) * 0.5;
      totalSurcharge += amountSurcharge;
    }

    const orderDate = new Date(enteredTimeValue);

    if (
      orderDate.getDay() === 5 &&
      orderDate.getUTCHours() >= 15 &&
      orderDate.getUTCHours() <= 18
    ) {
      totalSurcharge = parseFloat((totalSurcharge * 1.1).toFixed(2));
    }

    if (totalSurcharge > 15) {
      totalSurcharge = 15;
    }

    if (enteredCartValue >= 100) {
      totalSurcharge = 0;
    }

    /** The new result is set by using the state variable  */
    setResult(totalSurcharge);
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="cart">Cart Value (€)</label>
        <span className="euro"></span>
        <input
          type="number"
          step="0.01"
          min="0"
          id="cart"
          name="cart"
          ref={inputCartRef}
          required
        />
        <label htmlFor="distance">Delivery distance (m)</label>
        <input
          type="number"
          id="delivery"
          name="delivery"
          min="0"
          ref={inputDistanceRef}
          required
        />
        <label htmlFor="items">Amount of items</label>
        <input
          type="number"
          id="amount"
          name="amount"
          min="0"
          ref={inputAmountRef}
          required
        />
        <label htmlFor="time" className={classes.label}>
          Time
        </label>
        <input
          type="datetime-local"
          id="time"
          name="time"
          ref={inputTimeRef}
          required
        />
        <button className={classes.button}>Calculate delivery price</button>
      </form>
      <p className={classes.result}>Delivery Price: {result}€</p>
    </div>
  );
};

export default Calculator;
