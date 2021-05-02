export function writePermission(users, currentUserId){
    users.find(
        ({ userId, permission }) =>
          userId === currentUserId && permission === "WRITE"
      )
        ? false
        : true
}

export function readPermission(users, currentUserId){
    users.find(
        ({ userId, permission }) =>
          userId === currentUserId && permission === "READ"
      )
        ? false
        : true
}