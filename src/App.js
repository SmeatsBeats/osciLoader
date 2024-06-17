import React, { useState, useEffect, useCallback } from 'react';
import { useBattery } from 'react-use';
import './App.css';

function AudioSynth() {

  return (
    <div>
      <h1>Audio Synth</h1>
      <BatteryPercentage />
    </div>
    

  );
}

function BatteryPercentage() {
  // get the battery percentage of the device
  const battery = useBattery();

  // destructuring the battery object
  const { isSupported, charging, level } = battery;

  // check if the battery is supported
  
  if (!isSupported) {
    return <div>Battery information is not supported</div>;
  }
  else {
    return (
      <div>
        <h2>Battery Information</h2>
        <p>Charging: {charging ? 'Yes' : 'No'}</p>
        <p>Level: {level * 100}%</p>
      </div>
    );
  }



}



export default AudioSynth;