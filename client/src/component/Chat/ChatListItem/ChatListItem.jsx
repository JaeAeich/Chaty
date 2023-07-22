import React from 'react';
// import { ChatState } from '../../../context/chatProvider';
import './ChatListItem.css';

function ChatListItem(props) {
	const { user, handleFunction } = props;
	console.log(user);
	return (
		<div
			className='list-item-container'
			onClick={() => handleFunction(user._id)}
		>
			<div className='data'>
				<div className='avatar'>
					<img src={user.pfp} alt={user.name} />
				</div>
				<div className='user-info'>
					<div className='name'>{user.name}</div>
					<div className='email'>{user.email}</div>
				</div>
			</div>
		</div>
	);
}

export default ChatListItem;
