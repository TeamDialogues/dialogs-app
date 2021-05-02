export const checkUserPermissionWrite = ({ users, currentUser }) => {
  return users.find(
    ({ userId, permission }) =>
      userId === currentUser?.id && permission === "write"
  )
    ? false
    : true;
};
