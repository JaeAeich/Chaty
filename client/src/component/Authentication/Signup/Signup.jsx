import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import pfp from '../../../assets/pfp.png';
import axios from 'axios';
import './Signup.css';

function Signup() {
	const [pfpPreview, setPfpPreview] = useState(pfp);
	const [pic, setPic] = useState(null);
	const [picLoading, setPicLoading] = useState(false);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [cPassword, setCPassword] = useState();
	const navigate = useNavigate();

	const handlePfpChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPfpPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const postDetails = async (event) => {
		const pics = event.target.files[0];
		setPicLoading(true);
		if (pics === undefined) {
			toast.error('Please select an image', {
				position: toast.POSITION.TOP_RIGHT,
			});
			return;
		}
		if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', 'chaty_preset');
			data.append('cloud_name', 'ddqklzh3t');
			try {
				const response = await fetch(
					'https://api.cloudinary.com/v1_1/ddqklzh3t/image/upload',
					{
						method: 'post',
						body: data,
					}
				);
				const responseData = await response.json();
				setPic(responseData.url.toString());
				setPicLoading(false);
				handlePfpChange(event);
			} catch (err) {
				toast.error('Some error occured', {
					position: toast.POSITION.TOP_RIGHT,
				});
				setPicLoading(false);
			}
		} else {
			toast.error('Please select an image', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setPicLoading(false);
			return;
		}
	};

	const submitHandler = async () => {
		setPicLoading(true);

		if (!name || !email || !password || !cPassword) {
			toast.error('Please fill in all fields!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setPicLoading(false);
			return;
		}

		if (password !== cPassword) {
			toast.error('Passwords did not match!', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setPicLoading(false);
			return;
		}

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data } = await axios.post(
				`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user`,
				{
					name,
					email,
					password,
					pfp: pic,
				},
				config
			);

			toast.success('Registration Success', {
				position: toast.POSITION.TOP_RIGHT,
			});

			localStorage.setItem('userInfo', JSON.stringify(data));
			setPicLoading(false);
			navigate('/chat');
		} catch (error) {
			toast.error('Some error occured', {
				position: toast.POSITION.TOP_RIGHT,
			});
			setPicLoading(false);
		}
	};

	return (
		<div>
			<form className='signup-form'>
				<div className='form-group pfp-input'>
					<label htmlFor='pfp' className='pfp-label'>
						<input
							type='file'
							id='pfp'
							name='pfp'
							accept='image/*'
							onChange={postDetails}
						/>
						<div className='pfp-preview'>
							{pfpPreview ? (
								<img
									src={pfpPreview}
									alt='Profile Preview'
									className='pfp-image'
								/>
							) : (
								<span className='pfp-text'>Click to change image</span>
							)}
						</div>
					</label>
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Name:</label>
					<input
						type='text'
						id='name'
						name='name'
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
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
				<div className='form-group'>
					<label htmlFor='password'>Confirm password:</label>
					<input
						type='password'
						id='Cpassword'
						name='Cpassword'
						onChange={(e) => setCPassword(e.target.value)}
						required
					/>
				</div>
				{picLoading && (
					<button type='submit' onClick={submitHandler}>
						Wait Please
					</button>
				)}
				{!picLoading && (
					<button type='submit' onClick={submitHandler}>
						Sign Up
					</button>
				)}
			</form>
			<ToastContainer />
		</div>
	);
}

export default Signup;
