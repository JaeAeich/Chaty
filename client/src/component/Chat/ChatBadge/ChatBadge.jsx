import React from 'react';
import './ChatBadge.css';

const ChatBadge = ({ user, handleFunction }) => {
	return (
		<div className='badge' onClick={handleFunction}>
			{user.name}
		</div>
	);
};

export default ChatBadge;
