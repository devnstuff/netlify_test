import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App.jsx';
import './style.scss';

render(
  <Router>
    <App />
  </Router>,
  document.querySelector('#app')
);

if (module.hot) {
  module.hot.accept();
}
