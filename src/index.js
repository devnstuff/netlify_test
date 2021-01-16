import React from 'react';
import { render } from 'react-dom';

import './style.scss';

render(
  <div>
    <p>Hello World</p>
  </div>,
  document.querySelector('#app')
);

if (module.hot) {
  module.hot.accept();
}
