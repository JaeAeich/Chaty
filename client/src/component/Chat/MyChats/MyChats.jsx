import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../../context/chatProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import './MyChat.css';
import { getSender } from '../../../config/chatConfig';
import GroupModal from '../GroupModal/GroupModal';
import ScrollableFeed from 'react-scrollable-feed';

function MyChats({ fetchAgain }) {
	const [loggedUser, setLoggedUser] = useState();
	const [modal, setModal] = useState(false);

	const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

	const handleModal = () => {
		setModal(!modal);
	};

	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axios.get(
				`${process.env.VITE_BACKEND_BASE_URL}/api/chat`,
				config
			);
			setChats(data);
		} catch (error) {
			toast.error('Some error occured while fetching the chats', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const customStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	useEffect(() => {
		setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
		fetchChats();
	}, [fetchAgain]);

	Modal.setAppElement('#app');

	return (
		<div className='my-chat-container' id='ele'>
			<Modal
				isOpen={modal}
				style={customStyles}
				onRequestClose={handleModal}
				shouldCloseOnOverlayClick={true}
			>
				<GroupModal handleModal={handleModal}></GroupModal>
			</Modal>
			<div className='chat-browse-box'>
				<div className='title'>
					<div className='logo'>MY CHATS</div>
					<div className='group-button' onClick={handleModal}>
						Create group
					</div>
				</div>
				<ScrollableFeed>
					{chats ? (
						<div className='chats'>
							{chats.map((chat) => (
								<div
									className='chat'
									onClick={() => setSelectedChat(chat)}
									key={chat._id}
								>
									<div className='chatee-name'>
										{!chat.isGroupChat
											? getSender(loggedUser, chat.users)
											: chat.chatName}
									</div>
									{chat.lastMessage && (
										<div className='chat-name-container' fontSize='xs'>
											<div className='chat-name'>
												{chat.lastMessage.sender.name}:
											</div>
											<div className='last-message'>
												{chat.lastMessage.content.length > 50
													? chat.lastMessage.content.substring(0, 51) + '...'
													: chat.lastMessage.content}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
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
				</ScrollableFeed>
			</div>
		</div>
	);
}

export default MyChats;
