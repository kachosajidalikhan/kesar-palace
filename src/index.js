import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './component/store/store';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div>
  <Provider store={store}>
    <App />
    </Provider>
    </div>
);
reportWebVitals();
