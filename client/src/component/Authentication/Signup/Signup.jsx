import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
			alert('Please Select an Image!');
			return;
		}
		console.log(pics);
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
				console.log(response);
				const responseData = await response.json();
				setPic(responseData.url.toString());
				console.log(responseData.url.toString());
				setPicLoading(false);
				handlePfpChange(event);
			} catch (err) {
				console.log(err);
				setPicLoading(false);
			}
		} else {
			alert('Please Select an Image!');
			setPicLoading(false);
			return;
		}
	};

	const submitHandler = async () => {
		setPicLoading(true);

		if (!name || !email || !password || !cPassword) {
			alert('Please fill in all the fields');
			setPicLoading(false);
			return;
		}

		if (password !== cPassword) {
			alert({
				title: 'Passwords do not match',
				status: 'warning',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
			});
			setPicLoading(false);
			return;
		}

		console.log(name, email, password, pic);

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			const { data } = await axios.post(
				'http://localhost:4000/api/user',
				{
					name,
					email,
					password,
					pic,
				},
				config
			);

			console.log(data);

			alert('Registration Successful');

			localStorage.setItem('userInfo', JSON.stringify(data));
			setPicLoading(false);
			history.push('/chats');
		} catch (error) {
			alert('Error occurred!');
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
		</div>
	);
}

export default Signup;
