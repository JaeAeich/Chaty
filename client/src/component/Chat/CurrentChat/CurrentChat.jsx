import React, { useState } from 'react';
import { ChatState } from '../../../context/chatProvider';
import { getSender, getSenderFull } from '../../../config/chatConfig';

const CurrentChat = ({ fetchAgain, setFetchAgain }) => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [newMessage, setNewMessage] = useState('');
	const [socketConnected, setSocketConnected] = useState(false);
	const [typing, setTyping] = useState(false);
	const [istyping, setIsTyping] = useState(false);

	const { selectedChat, setSelectedChat, user, notification, setNotification } =
		ChatState();

	return (
		<>
			{selectedChat ? (
				<div className='current-chat'>
					<div>
						<div className='button-arrow' onClick={() => setSelectedChat('')} />
						{messages &&
							(!selectedChat.isGroupChat ? (
								<>
									{getSender(user, selectedChat.users)}
									{/* <ProfileModal
										user={getSenderFull(user, selectedChat.users)}
									/> */}
								</>
							) : (
								<>
									{selectedChat.chatName.toUpperCase()}
									{/* <UpdateGroupChatModal
										fetchMessages={fetchMessages}
										fetchAgain={fetchAgain}
										setFetchAgain={setFetchAgain}
									/> */}
								</>
							))}
					</div>
					<div
						d='flex'
						flexDir='column'
						justifyContent='flex-end'
						p={3}
						bg='#E8E8E8'
						w='100%'
						h='100%'
						borderRadius='lg'
						overflowY='hidden'
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
				<div d='flex' alignItems='center' justifyContent='center' h='100%'>
					<div fontSize='3xl' pb={3} fontFamily='Work sans'>
						Click on a user to start chatting
					</div>
				</div>
			)}
		</>
	);
};

export default CurrentChat;
