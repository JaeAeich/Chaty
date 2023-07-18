import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ChatProvider from './context/chatProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter basename='/'>
		<ChatProvider>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ChatProvider>
	</BrowserRouter>
);
