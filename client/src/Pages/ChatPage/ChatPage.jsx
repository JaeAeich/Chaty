import { useEffect, useState } from 'react';
import { ChatState } from '../../context/chatProvider';
import Drawer from '../../component/Chat/Drawer/Drawer';
import MyChats from '../../component/Chat/MyChats/MyChats';
import ChatBox from '../../component/Chat/ChatBox/ChatBox';
import './ChatPage.css';

const Chatpage = () => {
	const [fetchAgain, setFetchAgain] = useState(false);
	const { user } = ChatState();
	const { selectedChat } = ChatState();

	return (
		<div className='chat-container'>
			<div className='header'>{<Drawer />}</div>
			<div className='body'>
				{user && (
					<div
						className={!selectedChat ? 'my-chats-body' : 'my-small-chats-body'}
					>
						<MyChats fetchAgain={fetchAgain} />
					</div>
				)}
				{user && (
					<div
						className={selectedChat ? 'my-chats-box' : 'my-small-chats-box'}
					>
						<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Chatpage;
