import axios from 'axios';

// Base URL
axios.defaults.baseURL = 'https://pixabay.com/api/';

// API-key
const API_KEY = '35695662-2f1aa19a2cfb13ed0e26200f2';

// fetch function
export const fetchPictures = async (pictureName, page, per_page) => {
  const response = await axios.get(
    `?q=${pictureName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return response.data;
};
