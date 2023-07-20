import { ChatState } from '../../../context/chatProvider';
import CurrentChat from '../CurrentChat/CurrentChat';
import './Chatbox.css';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
	const { selectedChat } = ChatState();

	return (
		<div className='chat-box'>
			<CurrentChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
		</div>
	);
};

export default Chatbox;
