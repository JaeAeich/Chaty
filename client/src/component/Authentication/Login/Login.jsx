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

	const submitHandler = async (e) => {
		e.preventDefault();
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
				`${process.env.VITE_BACKEND_BASE_URL}/api/user/login`,
				{ email, password },
				config
			);

			toast.success('Login successful', {
				position: toast.POSITION.TOP_RIGHT,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));

			setLoading(false);
			navigate('/chat');
		} catch (error) {
			toast.error('Some error occured!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoading(false);
		}
	};

	const submitGuest = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const guestEmail = process.env.VITE_GUEST_EMAIL;
			const guestPassword = process.env.VITE_GUEST_PASSWORD;

			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setEmail(guestEmail); // This will update the input field with the guest email
			setPassword(guestPassword); // This will update the input field with the guest password

			const { data } = await axios.post(
				`${process.env.VITE_BACKEND_BASE_URL}/api/user/login`,
				{ email: guestEmail, password: guestPassword },
				config
			);

			toast.success('Login successful', {
				position: toast.POSITION.TOP_RIGHT,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));

			setLoading(false);
			navigate('/chat');
		} catch (error) {
			toast.error('Some error occurred!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setLoading(false);
		}
	};

	return (
		<div>
			<form className='login-form' onSubmit={() => false}>
				<div className='form-group'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='login-button'>
					{!loading && (
						<button type='submit' onClick={(e) => submitHandler(e)}>
							Login
						</button>
					)}
					{loading && <button disabled>Please Wait</button>}
					{!loading && (
						<button type='submit' onClick={(e) => submitGuest(e)}>
							Guest User
						</button>
					)}
				</div>
			</form>
			<ToastContainer></ToastContainer>
		</div>
	);
}

export default Login;
