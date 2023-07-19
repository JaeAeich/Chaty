import React, { useState } from 'react';
import OverlayDrawer from 'react-modern-drawer';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import 'react-modern-drawer/dist/index.css';
import './Drawer.css';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../../context/chatProvider';
import Skeleton from '../Skeleton/Skeleton';
import ChatListItem from '../ChatListItem/ChatListItem';

function Drawer() {
	const [search, setSearch] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingChat, setLoadingChat] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();

	const {
		setSelectedChat,
		user,
		notification,
		setNotification,
		chats,
		setChats,
	} = ChatState();

	const handleLogout = () => {
		localStorage.removeItem('userInfo');
		navigate('/');
	};

	const toggleDrawer = () => {
		setIsOpen(!isOpen);
	};

	const handleSearch = async (e) => {
		if (!search) {
			toast.error('Please fill int the search paramenter', {
				position: toast.POSITION.TOP_RIGHT,
			});
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

			setLoading(false);
			setSearchResult(data);
		} catch (error) {
			toast.error('Some error occured', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	return (
		<div className='drawer-container'>
			<div className='header'>
				<OverlayDrawer
					open={isOpen}
					onClose={toggleDrawer}
					direction='left'
					className='overlay-drawer'
				>
					<div className='search-input'>
						<input
							type='text'
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className='find' onClick={(e) => handleSearch(e)}>
							Search
						</div>
					</div>
					<div className='search-result'>
						{loading ? (
							<Skeleton />
						) : (
							searchResult?.map((user) => (
								<ChatListItem key={user._id} user={user} />
							))
						)}
					</div>
				</OverlayDrawer>
				<div className='search-box' onClick={toggleDrawer}>
					<svg
						onClick={toggleDrawer}
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-search'
						viewBox='0 0 16 16'
					>
						<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
					</svg>
					<div className='search-text'>Search User</div>
				</div>
			</div>
			<div className='mid'>
				<div className='logo'>Chaty</div>
				<ToastContainer />
			</div>
			<div className='settings'>
				<div className='notification'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='16'
						height='16'
						fill='currentColor'
						className='bi bi-bell'
						viewBox='0 0 16 16'
					>
						<path d='M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z' />
					</svg>
				</div>
				<div className='logout' onClick={handleLogout}>
					Logout
				</div>
			</div>
		</div>
	);
}

export default Drawer;
