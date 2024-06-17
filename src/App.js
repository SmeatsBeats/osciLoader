import React, { useState, useEffect } from 'react';
import './App.css';

function AudioSynth() {
  const [audioContext] = useState(new (window.AudioContext || window.webkitAudioContext)());

  // Memoize playTone function to prevent it from changing on every render
  const playTone = useCallback((frequency = 440) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1); // Stop after 1 second
  }, [audioContext]);

  useEffect(() => {
    // Call getBatteryPercentage when the component mounts
    getBatteryPercentage((level) => {
      // Play tone with frequency based on battery level
      playTone(level); 
    });
  }, [playTone]); // playTone is now stable and won't cause useEffect to re-run unnecessarily

  return (
    <div>
      <button onClick={() => playTone()}>Play Tone</button>
    </div>
  );
}

function getBatteryPercentage(callback) {
  navigator.getBattery().then(function(battery) {
    // Initial call
    callback(battery.level * 100);

    // Add event listener for level change
    battery.addEventListener('levelchange', () => {
      callback(battery.level * 100); // Convert to percentage
    });
  }).catch(error => console.error("Battery status is not supported.", error));
}

export default AudioSynth;