import axios from "axios";

axios.defaults.baseURL = "https://holdu-c5c853e4534e.herokuapp.com/";
axios.defaults.headers.post['Content-Type'] = "multipart/form-data";
axios.defaults.withCredentials = true;