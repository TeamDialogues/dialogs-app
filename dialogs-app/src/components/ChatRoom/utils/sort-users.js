export const sortUsers = ({chat, currentUser}) =>{
    
    const currentUserInfoFromChat = chat.users.find(
      ({ id }) => id === currentUser.id
    );
    const hostOfTheChat = chat.users.find(
      ({ permission }) => permission === "ADMIN"
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

  return {sortedUsers, isCurrentUserAdmin, hostOfTheChat};
}