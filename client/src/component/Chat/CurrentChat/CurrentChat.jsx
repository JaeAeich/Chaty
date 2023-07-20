import React, { useState } from 'react';
import { ChatState } from '../../../context/chatProvider';
import { getSender, getSenderFull } from '../../../config/chatConfig';
import Modal from 'react-modal';
import ProfileModal from '../ProfileModal/ProfileModal';
import './CurrentChat.css';
import GroupInfoModal from '../GroupInfoModal/GroupInfoModal';

const CurrentChat = ({ fetchAgain, setFetchAgain }) => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing, setTyping] = useState(false);
	const [istyping, setIsTyping] = useState(false);
	const [modal, setModal] = useState(false);

	const { selectedChat, setSelectedChat, user, notification, setNotification } =
		ChatState();
	const handleModal = () => {
		setModal(!modal);
	};

	const fetchMessages = async () => {
		if (!selectedChat) return;

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			setLoading(true);

			const { data } = await axios.get(
				`/api/message/${selectedChat._id}`,
				config
			);
			setMessages(data);
			setLoading(false);

			socket.emit('join chat', selectedChat._id);
		} catch (error) {
			toast({
				title: 'Error Occured!',
				description: 'Failed to Load the Messages',
				status: 'error',
				duration: 5000,
				isClosable: true,
				position: 'bottom',
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

	return (
		<div className='current-chat-container'>
			{selectedChat ? (
				<div className='current-chat'>
					<div className='chat-header'>
						<div className='button-arrow' onClick={() => setSelectedChat('')}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								class='bi bi-caret-left'
								viewBox='0 0 16 16'
							>
								<path d='M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z' />
							</svg>
						</div>
						{messages &&
							(!selectedChat.isGroupChat ? (
								<>
									{getSender(user, selectedChat.users)}
									<div className='view' onClick={handleModal}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											class='bi bi-person'
											viewBox='0 0 16 16'
										>
											<path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
										</svg>
									</div>
									<Modal
										isOpen={modal}
										style={customStyles}
										onRequestClose={handleModal}
										shouldCloseOnOverlayClick={true}
									>
										<ProfileModal
											user={getSenderFull(user, selectedChat.users)}
											handleModal={handleModal}
										/>
									</Modal>
								</>
							) : (
								<>
									{selectedChat.chatName.toUpperCase()}
									<div className='view' onClick={handleModal}>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											class='bi bi-people'
											viewBox='0 0 16 16'
										>
											<path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z' />
										</svg>
									</div>
									<Modal
										isOpen={modal}
										style={customStyles}
										onRequestClose={handleModal}
										shouldCloseOnOverlayClick={true}
									>
										<GroupInfoModal
											fetchMessages={fetchMessages}
											fetchAgain={fetchAgain}
											setFetchAgain={setFetchAgain}
											handleModal={handleModal}
										/>
									</Modal>
								</>
							))}
					</div>
					<div
					// d='flex'
					// flexDir='column'
					// justifyContent='flex-end'
					// p={3}
					// bg='#E8E8E8'
					// w='100%'
					// h='100%'
					// borderRadius='lg'
					// overflowY='hidden'
					>
						{loading ? (
							<div className='loading'>Loading</div>
						) : (
							<div className='messages'>
								{/* <ScrollableChat messages={messages} /> */}
							</div>
						)}

						{/* <FormControl
							onKeyDown={sendMessage}
							id='first-name'
							isRequired
							mt={3}
						>
							{istyping ? (
								<div>
									<Lottie
										options={defaultOptions}
										// height={50}
										width={70}
										style={{ marginBottom: 15, marginLeft: 0 }}
									/>
								</div>
							) : (
								<></>
							)}
							<Input
								variant='filled'
								bg='#E0E0E0'
								placeholder='Enter a message..'
								value={newMessage}
								onChange={typingHandler}
							/>
						</FormControl> */}
					</div>
				</div>
			) : (
				// to get socket.io on same page
				<div
				//  d='flex' alignItems='center' justifyContent='center' h='100%'
				>
					<div
					//  fontSize='3xl' pb={3} fontFamily='Work sans'
					>
						Click on a user to start chatting
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrentChat;
