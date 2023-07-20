import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from '../../../context/chatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

	return <div></div>;
}

export default MyChats;
