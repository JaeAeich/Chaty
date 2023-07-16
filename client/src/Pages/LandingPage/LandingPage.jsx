import React from 'react';
import { useState } from 'react';
import './LandingPage.css';

function LandingPage() {
	const [Login, setLogin] = useState(true);

	const handleLoginClick = () => {
		setLogin(true);
	};

	const handleSignupClick = () => {
		setLogin(false);
	};

	return (
		<div className='container'>
			<div className='header'>
				<h1>Chaty</h1>
			</div>
			<div className='tabs'>
				<div
					className='tab'
					style={Login ? { borderBottom: '0.2rem solid var(--color-cta)' } : {}}
					onClick={handleLoginClick}
				>
					Login
				</div>
				<div
					className='tab'
					style={!Login ? { borderBottom: '0.2rem solid var(--color-cta)' } : {}}
					onClick={handleSignupClick}
				>
					Signup
				</div>
			</div>
			{Login && <div>Login</div>}
			{!Login && <div>Signup</div>}
		</div>
	);
}

export default LandingPage;
