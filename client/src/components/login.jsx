import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdWarning } from 'react-icons/io';
import Form from './common/form';
import './styles/login.css';

const Login = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault();
    await fetch('/users/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        if (response.error) setError(response.error);
        else {
          localStorage.setItem('username', response.username);
          navigate('/');
        }
      });
  };
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value, // Dynamic object
    });
  };
  return (
    <Form method='POST' button='Log In' onSubmit={e => submit(e)} onChange={e => handleChange(e)}>
      {error && <p id='error'><IoMdWarning color='red' id='warning' />{error}</p>}
    </Form>
  );
};

export default Login;