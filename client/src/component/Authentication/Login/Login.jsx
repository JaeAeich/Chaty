import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async () => {
		setLoading(true);
		if (!email || !password) {
			toast.error('Please fill all fields', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoading(false);
			return;
		}

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data } = await axios.post(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/login`,
				{ email, password },
				config
			);

			toast.success('Login successful', {
				position: toast.POSITION.TOP_RIGHT,
			});
			// localStorage.clear()
			localStorage.setItem('userInfo', JSON.stringify(data));
			const d = { ...localStorage };
			setLoading(false);
			navigate('/chat');
		} catch (error) {
			toast.error('Some error occured!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoading(false);
		}
	};

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
				{!loading && (
					<button type='submit' onClick={submitHandler}>
						Login
					</button>
				)}
				{loading && (
					<button type='submit' onClick={submitHandler}>
						Please Wait
					</button>
				)}
			</form>
			<ToastContainer></ToastContainer>
		</div>
	);
}

export default Login;
