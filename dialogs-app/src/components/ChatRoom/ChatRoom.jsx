import { useEffect, useState } from "react";
import { currentUser, emojis, chat } from "../../temp-database";

import "./chat-room.css";
import { UserListItem } from "./UsersListItem";

export function ChatRoom() {
  const [showEmojiContainer, setEmojiContainerVisibility] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [showHamburger, setHamburger] = useState(false);

  const hostOfTheChat = chat.users.find(
    ({ permission }) => permission === "ADMIN"
  );

  const currentUserInfoFromChat = chat.users.find(
    ({ id }) => id === currentUser.id
  );

  const isCurrentUserAdmin = hostOfTheChat.id === currentUserInfoFromChat.id;

  const activeUsers = chat.users.filter(
    ({ id, permission }) => id !== currentUser.id && permission === "WRITE"
  );
  const guestUsers = chat.users.filter(
    ({ id, permission }) => id !== currentUser.id && permission === "READ"
  );
  const requestedUsers = chat.users.filter(
    ({ id, permission }) => id !== currentUser.id && permission === "REQUEST"
  );

  const sortedUsers = isCurrentUserAdmin
    ? [hostOfTheChat, ...requestedUsers, ...activeUsers, ...guestUsers]
    : [
        hostOfTheChat,
        currentUserInfoFromChat,
        ...requestedUsers,
        ...activeUsers,
        ...guestUsers,
      ];

  useEffect(() => {
    //make user's permission in chat model- read
    return () => {
      //remove user from users array in chat model
    };
  });
  return (
    <div className="grid-30-70-layout">
      <div className={`grid-item-1 grid-item ${showHamburger && "active"}`}>
        <button
          className="hamburger-cross"
          onClick={() => {
            setHamburger((flag) => !flag);
          }}
        >
          <i className="fas fa-times"></i>
        </button>
        <button className="btn btn-secondary-solid raise-request-btn">
          <i className="fas fa-hand-paper margin-right-4px"></i>Raise Request To
          Join Chat
        </button>
        <ul className="users-list">
          {sortedUsers.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              isCurrentUserAdmin={isCurrentUserAdmin}
            />
          ))}
        </ul>
      </div>

      <div className="grid-item-2 grid-item">
        <div className="chat-details">
          <h1>{chat.title}</h1>
          <p className="text-color-secondary">{chat.agenda}</p>
        </div>
        <button
          className="btn btn-open-users-hamburger"
          onClick={() => {
            setHamburger(true);
          }}
        >
          Users Joined
        </button>

        <div className="divider-overlay">
          <span className="chat-date">{chat.createdAt.toDateString()}</span>
        </div>

        {chat.messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`chat-bubble-wrapper ${
                message.sender.id === currentUser.id
                  ? "chat-bubble-wrapper-right"
                  : "chat-bubble-wrapper-left"
              }`}
            >
              <img
                className="avatar"
                src={message.sender.avatar}
                alt={message.sender.name}
              />
              <div className="message-container">
                <div
                  className={`chat-bubble ${
                    message.sender.id === currentUser.id
                      ? "chat-bubble-right"
                      : "chat-bubble-left"
                  }`}
                >
                  {message.text}
                </div>
                <div className="bubble-sender-name">
                  {message.sender.name} {message.createdAt.getHours()}:
                  {message.createdAt.getMinutes()}
                </div>
                {currentUser.id === hostOfTheChat.id && (
                  <button className="star-on-message btn">
                    <i className="fas fa-star"></i>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        <div id="last-div"></div>
        <div className="input-message-wrapper">
          <a href="#last-div" className="link jump-to-present-button">
            Jump to present <i className="fas fa-chevron-down"></i>
          </a>

          {showEmojiContainer && (
            <div className="emoji-container">
              {emojis.map((emoji) => (
                <button
                  key={emoji}
                  className="emoji btn-icon btn"
                  onClick={() =>
                    setTextMessage((message) => message.concat(emoji))
                  }
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
          <div
            className="btn btn-icon"
            onClick={() => setEmojiContainerVisibility((flag) => !flag)}
          >
            <i className="far fa-grin-beam"></i>
          </div>
          <input
            disabled={
              chat.users.find(
                ({ userId, permission }) =>
                  userId === currentUser.id && permission === "write"
              )
                ? false
                : true
            }
            className="input-message-field flex-grow"
            placeholder="Type in your message.."
            type="text"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
          />
          <button className="btn btn-primary-solid">Send</button>
        </div>
      </div>
    </div>
  );
}
