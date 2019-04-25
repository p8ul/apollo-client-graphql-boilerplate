import axios from 'axios';
import { object } from 'prop-types';

export default (file: File | string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'hpv1l67l');
  return axios.post('https://api.cloudinary.com/v1_1/p8ul/image/upload', formData)
  .then( response => response.data)
  .catch(response => {
      console.log(Object.keys(response), ' this is acasious error')
      return response.response.data.error
});
}
