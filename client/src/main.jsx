import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter basename='/'>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</BrowserRouter>
);
