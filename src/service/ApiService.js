import axios from '../utils/axiosCustomize';

const postCreateUser =(email,password,userName,role,image) => {
const form = new FormData();
form.append('email', email);
form.append('password', password);
form.append('username', userName);
form.append('role', role);
form.append('userImage', image);

return  axios.post('api/v1/participant', form);
}


const putUpdateUser =(id,userName,role,image) => {
const form = new FormData();
form.append('id', id);
form.append('username', userName);
form.append('role', role);
form.append('userImage', image);

return  axios.put('api/v1/participant', form);
}


const putDeleteUser = (id) => {
  return axios.delete('api/v1/participant', {
    data: { id: id }
  });
};


const getAllUser = () => {
       return  axios.get('api/v1/participant/all');
}
export {postCreateUser, getAllUser, putUpdateUser,putDeleteUser}