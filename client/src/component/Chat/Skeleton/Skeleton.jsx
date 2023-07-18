import React from 'react';
import './Skeleton.css';

function Skeleton() {
	return (
		<div className='container'>
			<span class='skeleton-box' style={{ width: '90%' }} />
			<span class='skeleton-box' style={{ width: '90%' }} />
			<span class='skeleton-box' style={{ width: '90%' }} />
			<span class='skeleton-box' style={{ width: '90%' }} />
			<span class='skeleton-box' style={{ width: '90%' }} />
			<span class='skeleton-box' style={{ width: '90%' }} />
			<span class='skeleton-box' style={{ width: '90%' }} />
		</div>
	);
}

export default Skeleton;
