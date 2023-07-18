import React from 'react';
import './Skeleton.css';

function Skeleton() {
	return (
		<div className='container'>
			<span className='skeleton-box' style={{ width: '90%' }} />
			<span className='skeleton-box' style={{ width: '90%' }} />
			<span className='skeleton-box' style={{ width: '90%' }} />
			<span className='skeleton-box' style={{ width: '90%' }} />
			<span className='skeleton-box' style={{ width: '90%' }} />
			<span className='skeleton-box' style={{ width: '90%' }} />
			<span className='skeleton-box' style={{ width: '90%' }} />
		</div>
	);
}

export default Skeleton;
