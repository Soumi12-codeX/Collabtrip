import axios from "axios";

const API = axios.create({
    baseURL : 'http://localhost:8080/api/rooms'
});


export const createRoom = async (code, adminName, travelDate) => {
  return API.post(`/create`, null, {
    params : {
    code: code,
    admin: adminName,
    travelDate: travelDate
    } 
  });
};
export const savePreferences = (roomCode, prefData) => API.post(`/${roomCode}/preferences`, prefData);
export const getRoomDetails = (roomCode) => API.get(`/${roomCode}`);

export default API;