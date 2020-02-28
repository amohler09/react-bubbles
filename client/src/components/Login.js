import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

const Login = props => {
  const [credentials, setCredentials] = useState({ username: '', password: ''})

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res => {
      //console.log(res)
      window.localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => console.log('error in Login', err))
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username <br />
          <input 
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}
          />
        </label>

        <label>
          Password <br />
          <input 
          type='text'
          name='password'
          value={credentials.password}
          onChange={handleChange}
          />
        </label>
        <button>Log In</button>
      </form>
    </>
  );
};

export default Login;
