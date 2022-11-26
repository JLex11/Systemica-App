import { API_URL } from './ApiUrl';
const API_PATH = '/login';

export const Login = async credencials => {
  const { email, password } = credencials;

  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return await response.json();
};

export const Logout = () => {
  localStorage.removeItem('user_info');
  localStorage.removeItem('token');
  return true;
};
