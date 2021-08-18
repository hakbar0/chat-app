import React from 'react';
import ProfileAvatar from '../../../dashboard/ProfileAvatar';
import TimeAgo from 'timeago-react';

function MessageItem({ message }) {
  const { author, createdAt, text } = message;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="m1-1"
          size="xs"
        />
        <span className="m1-2">{author.name}</span>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>

      <div className="word-breal-all">{text}</div>
    </li>
  );
}

export default MessageItem;
