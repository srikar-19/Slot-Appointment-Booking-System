import React, { useState } from 'react';
import { Button, Space } from 'antd';

function Test() {
  const [buttonValue, setButtonValue] = useState('');

  const handleButtonClick = (event) => {
    // Retrieve the button value from the event
    const value = event.target.value;
    
    // Set the button value in the component's state
    setButtonValue(value);
    
    // You can perform any other actions with the value here
    // For example, you can display it in the console
    console.log('Button value:', value);
  };

  return (
    <div>
      <button value="10" onClick={handleButtonClick}>Button 1</button>
      <button value="Button 2" onClick={handleButtonClick}>Button 2</button>
      <button value="Button 3" onClick={handleButtonClick}>Button 3</button>
      <p>Clicked Button: {buttonValue}</p>
    </div>
  );
}

export default Test;
