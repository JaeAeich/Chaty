import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import {
	isLastMessage,
	isSameSender,
	isSameSenderMargin,
	isSameUser,
} from '../../../config/chatConfig';
import { ChatState } from '../../../context/chatProvider';

function CurrentScrollableChat({ messages }) {
	const { user } = ChatState();

	return (
		<div>
			<ScrollableFeed>
				{messages &&
					messages.map((m, i) => (
						<div
							className='curr-messages'
							style={{ color: 'var(--color-primary)', display: 'flex' }}
							key={m._id}
						>
							{(isSameSender(messages, m, i, user._id) ||
								isLastMessage(messages, i, user._id)) && (
								<div
									className='avatar'
									style={{ display: 'flex', alignContent: 'end' }}
									label={m.sender.name}
								>
									<img
										style={{ width: '2rem', alignSelf: 'end' }}
										name={m.sender.name}
										src={m.sender.pfp}
									/>
								</div>
							)}
							<span
								style={{
									backgroundColor: `${
										m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
									}`,
									marginLeft: isSameSenderMargin(messages, m, i, user._id),
									marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
									borderRadius: '20px',
									padding: '5px 15px',
									maxWidth: '75%',
								}}
							>
								{m.content}
							</span>
						</div>
					))}
			</ScrollableFeed>
		</div>
	);
}

export default CurrentScrollableChat;
