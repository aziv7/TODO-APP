import { createContext, useState } from 'react';

export const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState(null);

  const login = async (userForm) => {
    const res = await fetch('users/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userForm),
    });
    const data = await res.json();

    if (!data || !data.user) {
      alert('Wrong credentials!');

      return null;
    }
    setUser({ ...data.user });
    localStorage.setItem('token', data.token);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout, login }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
