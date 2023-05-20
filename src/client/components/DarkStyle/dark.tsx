// In this component, we are creating a toggle button for switching between dark and light mode
// We use the useState hook to keep track of the current theme (dark or light) in the component state
// The state is initialized as false (light mode)
// On clicking the toggle button, we use the setIsChecked function to toggle the state between true (dark mode) and false (light mode)
// The CSS class is applied based on the state of the component
import React, { useState, useEffect } from "react";
import "./dark.css";


interface DarkProps {
  active: boolean;
}

// We use the useState hook to keep track of the current theme (dark or light) in the component state
const Dark: React.FC<DarkProps> = ({ active }) => {
    const [isChecked, setIsChecked] = useState(false);
  
    useEffect(() => {
        const body = document.body;
       
  
      if (isChecked) {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
      } else {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
      }
    }, [isChecked,active]);
  
  
  // The state is initialized as false (light mode)
    return (
      <div className="toggleWrapper">
        <input
          type="checkbox"
          className="dn"
          id="dn"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="dn" className="toggle">
          <span className="toggle__handler">
            <span className="crater crater--1"></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
          </span>
          <span className="star star--1"></span>
          <span className="star star--2"></span>
          <span className="star star--3"></span>
          <span className="star star--4"></span>
          <span className="star star--5"></span>
          <span className="star star--6"></span>
        </label>
      </div>
    );
  };
  
  export default Dark;
  