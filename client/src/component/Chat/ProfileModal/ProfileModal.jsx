import React from 'react';
import './ProfileModal.css';

function ProfileModal({ user, children, handleModal }) {
	return (
		<div className='container'>
			{/* {children ? (
				<span onClick={handleModal}>{children}</span>
			) : (
				<div clas d={{ base: 'flex' }} onClick={handleModal}>
					View
				</div>
			)} */}
			<div className='modal'>
				<div className='modal-content' h='410px'>
					<div
						className='modal-header'
					>
						{user.name}
					</div>
					<div
						className='modal-body'
					>
						<img
							className='image'
							src={user.pfp}
							alt={user.name}
						/>
						<div
							className='email'
						>
							Email: {user.email}
						</div>
					</div>
					<div className='modal-footer'>
						<button onClick={handleModal}>Close</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileModal;
