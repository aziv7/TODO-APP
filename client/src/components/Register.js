import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
const Register = ({ history }) => {
  const { user } = useContext(UserContext);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user) history.push('/');
  }, [user]);

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/users/register`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userForm),
    });
    const data = await res.json();
    if (data && data._id) history.push('/login');
  };

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='name'>Nom</label>
        <input
          value={userForm.name}
          onChange={(e) => {
            handleChange(e);
          }}
          type='text'
          name='name'
          className='form-control'
          id='name'
          required
          aria-describedby='name'
          placeholder='Enter Name'
        />
      </div>

      <div className='form-group'>
        <label htmlFor='exampleInputEmail1'>Email address</label>
        <input
          required
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
          required
          type='password'
          name='password'
          className='form-control'
          id='exampleInputPassword1'
          placeholder='Password'
        />
      </div>
      <div>
        <Link to='/login'>
          <a className='link-primary'>You have an account?</a>
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

export default Register;
