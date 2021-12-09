import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = ({ history }) => {
  const [userForm, setUserForm] = useState({ email: '', password: '' });
  const { login, user } = useContext(UserContext);
  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(userForm);
    console.log(data);
    if (data.user) {
      history.push('/');
    }
  };

  useEffect(() => {
    if (user || localStorage.getItem('token')) history.push('/');
  }, []);

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='exampleInputEmail1'>Email address</label>
        <input
          value={userForm.email}
          onChange={(e) => {
            handleChange(e);
          }}
          type='email'
          name='email'
          className='form-control'
          id='exampleInputEmail1'
          aria-describedby='emailHelp'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='exampleInputPassword1'>Password</label>
        <input
          value={userForm.password}
          onChange={(e) => {
            handleChange(e);
          }}
          type='password'
          name='password'
          className='form-control'
          id='exampleInputPassword1'
          placeholder='Password'
        />
      </div>
      <div>
        <Link to='/register'>
          <a className='link-primary'>You don't have an account?</a>
        </Link>
      </div>
      <button
        type='submit'
        onClick={(e) => handleSubmit(e)}
        className='btn btn-primary'
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
