import axios from 'axios';
import { useState } from 'react';
import { ChatState } from '../../../context/chatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatListItem from '../ChatListItem/ChatListItem';
import ChatBadge from '../ChatBadge/ChatBadge';
import './GroupModal.css';

const GroupModal = ({ handleModal }) => {
	const [groupChatName, setGroupChatName] = useState();
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user, chats, setChats } = ChatState();

	const handleGroup = (userToAdd) => {
		if (selectedUsers.includes(userToAdd)) {
			toast.warning('User already added');
			return;
		}

		setSelectedUsers([...selectedUsers, userToAdd]);
	};

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
				`http://localhost:4000/api/user?search=${search}`,
				config
			);
			console.log(data);
			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast.error('Error Occured!');
		}
	};

	const handleDelete = (delUser) => {
		setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
	};

	const handleSubmit = async () => {
		if (!groupChatName || !selectedUsers) {
			toast.error('Please fill in all the details');
			return;
		}

		try {
			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};
			const { data } = await axios.post(
				`http://localhost:4000/api/chat/group`,
				{
					name: groupChatName,
					users: JSON.stringify(selectedUsers.map((u) => u._id)),
				},
				config
			);
			setChats([data, ...chats]);
			handleModal();
			toast.success('New Group Chat Created');
		} catch (error) {
			console.log(error);
			toast.error('Failed to Create the Chat!');
		}	
	};

	return (
		<div className='modal-content'>
			<ToastContainer />
			<div className='title'>Create Group Chat</div>
			<div className='modal-body'>
				<form className='modal-form'>
					<input
						placeholder='Chat Name'
						onChange={(e) => setGroupChatName(e.target.value)}
					/>
				</form>
				<form>
					<input
						placeholder='Add Users eg: Jae, Watermelon'
						onChange={(e) => handleSearch(e.target.value)}
					/>
				</form>
				<div className='modal-user-badge'>
					{selectedUsers.map((u) => (
						<ChatBadge
							key={u._id}
							user={u}
							handleFunction={() => handleDelete(u)}
						/>
					))}
				</div>
				{loading ? (
					<div>Loading...</div>
				) : (
					searchResult
						?.slice(0, 4)
						.map((user) => (
							<ChatListItem
								key={user._id}
								user={user}
								handleFunction={() => handleGroup(user)}
							/>
						))
				)}
			</div>
			<div className='modal-footer'>
				<button onClick={handleSubmit} colorScheme='blue'>
					Create Chat
				</button>
			</div>
		</div>
	);
};

export default GroupModal;
