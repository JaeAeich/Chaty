import React, { useState } from 'react';
import pfp from '../../../assets/pfp.png';
import './Signup.css';

function Signup() {
	const [pfpPreview, setPfpPreview] = useState(pfp);
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [cPassword, setCPassword] = useState();

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
							onChange={handlePfpChange}
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
						id='password'
						name='password'
						onChange={(e) => setCPassword(e.target.value)}
						required
					/>
				</div>
				<button type='submit'>Sign Up</button>
			</form>
		</div>
	);
}

export default Signup;
