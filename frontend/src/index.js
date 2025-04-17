import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { render } from "react-dom";
import './index.css';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

if (typeof window.ResizeObserver !== 'undefined') {
  const originalDisconnect = ResizeObserver.prototype.disconnect;
  ResizeObserver.prototype.disconnect = function() {
    // Suppress the warning by not allowing ResizeObserver to disconnect
    // This should be removed if you encounter performance issues
    // or unexpected behavior.
    originalDisconnect.call(this);
  };
};

render(<Provider store={store}><App /></Provider>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
