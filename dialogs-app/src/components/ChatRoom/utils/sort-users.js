export const sortUsers = ({users, currentUser}) =>{
    
  if(users && users.length !==0 ){
    const currentUserInfoFromChat = users.find(
      ({ id }) => id === currentUser?.id
    );
    const hostOfTheChat = users.find(
      ({ permission }) => permission === "ADMIN"
    );
  
    const isCurrentUserAdmin = hostOfTheChat?.id === currentUserInfoFromChat?.id;
  
    const activeUsers = users.filter(
      ({ id, permission }) => id !== currentUser?.id && permission === "WRITE"
    );
    const guestUsers = users.filter(
      ({ id, permission }) => id !== currentUser?.id && permission === "READ"
    );
    const requestedUsers = users.filter(
      ({ id, permission }) => id !== currentUser?.id && permission === "REQUEST"
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
    
  return {sortedUsers: [], isCurrentUserAdmin: [], hostOfTheChat: []};
  
}