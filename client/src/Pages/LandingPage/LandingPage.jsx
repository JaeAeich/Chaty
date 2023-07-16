import React from 'react';
import { useState } from 'react';
import Signup from '../../component/Authentication/Signup/Signup';
import Login from '../../component/Authentication/Login/Login';
import './LandingPage.css';

function LandingPage() {
	const [LoginState, setLoginState] = useState(true);

	const handleLoginClick = () => {
		setLoginState(true);
	};

	const handleSignupClick = () => {
		setLoginState(false);
	};

	return (
		<div className='container'>
			<div className='header'>
				<h1>Chaty</h1>
			</div>
			<div className='tabs'>
				<div
					className='tab'
					style={
						LoginState ? { borderBottom: '0.2rem solid var(--color-cta)' } : {}
					}
					onClick={handleLoginClick}
				>
					Login
				</div>
				<div
					className='tab'
					style={
						!LoginState ? { borderBottom: '0.2rem solid var(--color-cta)' } : {}
					}
					onClick={handleSignupClick}
				>
					Signup
				</div>
			</div>
			{LoginState && (
				<div>
					{' '}
					<Login></Login>
				</div>
			)}
			{!LoginState && (
				<div>
					<Signup></Signup>
				</div>
			)}
		</div>
	);
}

export default LandingPage;
