import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChatState } from '../../../context/chatProvider';
import ChatBadge from '../ChatBadge/ChatBadge';
import ChatListItem from '../ChatListItem/ChatListItem';
import './groupInfoModal.css';

const GroupInfoModal = ({
	fetchMessages,
	fetchAgain,
	setFetchAgain,
	handleModal,
}) => {
	const [groupChatName, setGroupChatName] = useState();
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [renameloading, setRenameLoading] = useState(false);

	const { selectedChat, setSelectedChat, user } = ChatState();

	const handleSearch = async (query) => {
		setSearch(query);
		if (!query) {
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.get(
				`${process.env.VITE_BACKEND_BASE_URL}/api/user?search=${search}`,
				config
			);
			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast.error('Error Occured!');
			setLoading(false);
		}
	};

	const handleRename = async () => {
		if (!groupChatName) return;

		try {
			setRenameLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				`${process.env.VITE_BACKEND_BASE_URL}/api/chat/rename`,
				{
					chatId: selectedChat._id,
					chatName: groupChatName,
				},
				config
			);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setRenameLoading(false);
		} catch (error) {
			toast.error('Error Occured!');
			setRenameLoading(false);
		}
		setGroupChatName('');
	};

	const handleAddUser = async (user1) => {
		if (selectedChat.users.find((u) => u._id === user1._id)) {
			toast.warning('User Already in group!');
			return;
		}

		if (selectedChat.groupAdmin._id !== user._id) {
			toast.info('Only admins can add someone!');
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				`${process.env.VITE_BACKEND_BASE_URL}/api/chat/groupadd`,
				{
					chatId: selectedChat._id,
					userId: user1._id,
				},
				config
			);

			setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			setLoading(false);
		} catch (error) {
			toast.error('Error Occured!');
			setLoading(false);
		}
		setGroupChatName('');
	};

	const handleRemove = async (user1) => {
		if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
			toast.info('Only admins can remove someone!');
			return;
		}

		try {
			setLoading(true);
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.put(
				`${process.env.VITE_BACKEND_BASE_URL}/api/chat/groupremove`,
				{
					chatId: selectedChat._id,
					userId: user1._id,
				},
				config
			);

			user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
			setFetchAgain(!fetchAgain);
			fetchMessages();
			setLoading(false);
		} catch (error) {
			toast('Error Occured!');
			setLoading(false);
		}
		setGroupChatName('');
	};

	return (
		<div className='modal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<div>{selectedChat.chatName}</div>

					<div className='modal-close' onClick={handleModal}>
						Close
					</div>
				</div>
				<div className='modal-content'>
					<div className='group-badge'>
						{selectedChat.users.map((u) => (
							<ChatBadge
								key={u._id}
								user={u}
								admin={selectedChat.groupAdmin}
								handleFunction={() => handleRemove(u)}
							/>
						))}
					</div>
					<div className='form'>
						<form>
							<input
								placeholder='Chat Name'
								mb={3}
								value={groupChatName}
								onChange={(e) => setGroupChatName(e.target.value)}
							/>
							<button
								variant='solid'
								colorScheme='teal'
								ml={1}
								isLoading={renameloading}
								onClick={handleRename}
							>
								Update
							</button>
						</form>
						<form>
							<input
								placeholder='Add User to group'
								mb={1}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</form>
					</div>

					{loading ? (
						<div className='loading'>Loading</div>
					) : (
						searchResult?.map((user) => (
							<ChatListItem
								key={user._id}
								user={user}
								handleFunction={() => handleAddUser(user)}
							/>
						))
					)}
				</div>
				<div className='modal-footer'>
					<button onClick={() => handleRemove(user)} colorScheme='red'>
						Leave Group
					</button>
				</div>
			</div>
		</div>
	);
};

export default GroupInfoModal;
