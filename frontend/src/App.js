import { ReactComponent as Logo} from './images/logo.svg';
import { useEffect, useState } from 'react';

function App() {
  const API_URL = 'https://dummyjson.com';

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    request(`/users/${selectedUser.id}`, 'PUT', selectedUser)
    request('/users', 'GET').then(data => {
      setUsers([ ...data.users ])
    });
  }

  const request = async (url, type, params=null) => {
    try {
      let response;
      if (type === 'GET') {
        response = await fetch(API_URL + url);
      } else if (type === 'PUT') {
        response = await fetch(API_URL + url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
      } else {
        throw new Error('Invalid request type');
      }

      if (!response.ok) {
        throw new Error('API response was not OK');
      }

      let responseJson = await response.json();

      return responseJson;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  useEffect(() => {
    request('/users?limit=20', 'GET')
      .then(data => {
        setUsers(data.users)
        setSelectedUser(data.users[0])
      });
  }, []); // Empty array ensures this runs once on mount


  return (
    <div className="text-base">
      <div className="p-10">
        <Logo />
      </div>

      <div className="grid grid-cols-3">
        <div className="mx-5 col-span-1 bg-blue rounded-lg mb-5">
          <h1 className="text-xl text-center font-bold p-4">Users</h1>
          <ul>
            {users && users.map((user, index) => (
              <li key={index} onClick={() => handleUserClick(user)} className="rounded-lg p-3 m-3 hover:bg-light-blue hover:cursor-pointer">
                <span className="font-bold">#{user.id}</span> {user.firstName || ''} {user.lastName || ''}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 col-span-2">
          <h1 className="text-xl text-center font-bold p-4">{selectedUser.firstName || ''} {selectedUser.lastName || ''}</h1>
            <div className="grid grid-cols-4 gap-5 mb-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Id:</div>
              <div className="col-span-3 p-5 border border-blue rounded-lg bg-blue">#{selectedUser.id || ''}</div>
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">First name:</div>
              <input type="text" name="firstName" onChange={handleChange} className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value={selectedUser.firstName || '' || ''} autoFocus /><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Last name:</div>
            <input type="text" name="lastName" onChange={handleChange} className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value={selectedUser.lastName || ''} /><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Age:</div>
            <input type="text" name="age" onChange={handleChange} className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value={selectedUser.age || ''} /><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Gender:</div>
            <input type="text" name="gender" onChange={handleChange} className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value={selectedUser.gender || ''} /><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Email:</div>
            <input type="text" name="email" onChange={handleChange} className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value={selectedUser.email || ''} /><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Phone:</div>
            <input type="text" name="phone" onChange={handleChange} className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value={selectedUser.phone || ''} /><br />
            </div>
          <button className="bg-orange hover:bg-dark-orange text-white p-5 rounded-lg w-full" onClick={handleUpdate}>Edit user</button>
        </div>
      </div>
    </div>
  );
}

export default App;
