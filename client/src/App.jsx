import { Routes, Route } from 'react-router-dom';
import ChatPage from './Pages/ChatPage';
import LandingPage from './Pages/LandingPage';

function App() {
	return (
		<div className='text-3xl font-bold underline'>
			<Routes>
				<Route path='/' exact element={<LandingPage />} />
				<Route path='/chat' exact element={<ChatPage />} />
			</Routes>
		</div>
	);
}

export default App;
