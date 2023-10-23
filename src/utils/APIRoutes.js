export const host = process.env.REACT_APP_DB;
export const registerRoute = `${host}/api/v1/user/register`;
export const loginRoute = `${host}/api/v1/user/login`;
export const SetAvatarRoute = `${host}/api/v1/user/setAvatar`;
export const allUserRoute = `${host}/api/v1/user/allusers`;
export const sendMessageRoute = `${host}/api/v1/message/addmsg`;
export const getAllMessagesRoute = `${host}/api/v1/message/getallmessages`;
