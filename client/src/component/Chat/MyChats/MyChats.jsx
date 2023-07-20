import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../../context/chatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyChat.css';
import { getSender } from '../../../config/chatConfig';

function MyChats({ fetchAgain }) {
	const [loggedUser, setLoggedUser] = useState();

	const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(
				'http://localhost:4000/api/chat',
				config
			);
			setChats(data);
		} catch (error) {
			console.log(error);
			toast.error('Some error occured while fetching the chats', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
		fetchChats();
	}, []);

	return (
		<div className='my-chat-container'>
			<div className='chat-browse-box'>
				<div className='title'>My Chats</div>
				{chats ? (
					<div className='chats'>
						{chats.map((chat) => (
							<div
								className='chat'
								onClick={() => setSelectedChat(chat)}
								key={chat._id}
							>
								{console.log(chat)}
								<p className='chat-name'>
									{!chat.isGroupChat
										? getSender(loggedUser, chat.users)
										: chat.chatName}
								</p>
								{chat.latestMessage && (
									<p className='lastMessage' fontSize='xs'>
										<b>{chat.latestMessage.sender.name} : </b>
										{chat.latestMessage.content.length > 50
											? chat.latestMessage.content.substring(0, 51) + '...'
											: chat.latestMessage.content}
									</p>
								)}
							</div>
						))}
					</div>
				) : (
					//   <ChatLoading />
					<div className='chats-loading'>
						<article>
							<div className='shimmer'>Loading</div>
						</article>
						<article>
							<div className='shimmer'>Loading</div>
						</article>
						<article>
							<div className='shimmer'>Loading</div>
						</article>
						<article>
							<div className='shimmer'>Loading</div>
						</article>
						<article>
							<div className='shimmer'>Loading</div>
						</article>
						<article>
							<div className='shimmer'>Loading</div>
						</article>
						<article>
							<div className='shimmer'>Loading</div>
						</article>
					</div>
				)}
			</div>
			<ToastContainer></ToastContainer>
		</div>
	);
}

export default MyChats;
