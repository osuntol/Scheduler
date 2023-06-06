import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //storing history as a statful array in order to keep track of the history of the modes.
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {

    if (!replace) {
      //setting newMode to setMode
      setMode(newMode);
      //using arrow function to access prev state 
      setHistory(prev => {
        //storing spread array of prev state into newHistory
        const newHistory = [...prev];
        //pushing newMode into newHistory
        newHistory.push(newMode);
        return newHistory
      });

    } else {
      //setting newMode to setMode
      setMode(newMode);
      //using arrow function to access prev state 
      setHistory(prev => {
        //storing spread array of prev state into newHistory
        const newHistory = [...prev];
        //accessing newHistory at last element adn storing it into newMode
        newHistory[newHistory.length - 1] = newMode;
        return newHistory;
      })
    }

  }
  function back() {
    if (history.length > 1) {
      //using arrow function to access prev state 
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop()
        return newHistory
      });
    }
  }
  //displaying mode  with the last element of the array
  return { mode: history[history.length - 1], transition, back };
}

