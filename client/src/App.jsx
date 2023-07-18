import { Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/ChatPage/ChatPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' exact element={<LandingPage />} />
				<Route path='/chat' exact element={<ChatPage />} />
			</Routes>
		</div>
	);
}

export default App;
