import React from 'react';
import { render } from 'react-dom';
import { GlitzClient } from '@glitz/core';
import transformers from '@glitz/transformers';
import { GlitzProvider } from '@glitz/react';
import App from '../App';
 
const glitz = new GlitzClient({ transformer: transformers() });
 
render(
  <GlitzProvider glitz={glitz}>
    <App />
  </GlitzProvider>,
  document.getElementById('container'),
);