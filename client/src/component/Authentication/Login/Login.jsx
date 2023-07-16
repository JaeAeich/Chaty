import React, { useState } from 'react';
import './Login.css';

function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	return (
		<div>
			<form className='login-form'>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
}

export default Login;
