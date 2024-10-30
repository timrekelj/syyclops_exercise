import { ReactComponent as Logo} from './images/logo.svg';
import { useEffect, useState } from 'react';

function App() {
  const API_URL = 'https://dummyjson.com';

  const [users, setUsers] = useState([]);

  async function request(url, type, params=null) {
    try {
      const response = await fetch(API_URL + url)

      if (!response.ok) {
        throw new Error('API response was not OK');
      }

      const data = await response.json();

      console.log(data.users)

      setUsers(data.users)

    } catch (error) {
      console.error('Error fetching data: ', error)
    }
  }

  useEffect(() => {
    request('/users?limit=20', 'GET')
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
              <li key={index} className="rounded-lg p-3 m-3 hover:bg-light-blue hover:cursor-pointer">
                <span className="font-bold">#{user.id}</span> {user.firstName} {user.lastName}
              </li>
            ))}
          </ul>
        </div>
        <div className="px-5 col-span-2">
          <h1 className="text-xl text-center font-bold p-4">John Doe</h1>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Id:</div>
              <input type="text" className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value="#1" autoFocus/><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">First name:</div>
              <input type="text" className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value="John"/><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Last name:</div>
              <input type="text" className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value="Doe"/><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Age:</div>
              <input type="text" className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value="19"/><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Gender:</div>
              <input type="text" className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value="Male"/><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Email:</div>
              <input type="text" className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value="test@mail.com"/><br />
            </div>
            <div className="grid grid-cols-4 gap-5">
              <div className="col-span-1 p-5 rounded-lg border border-blue bg-blue font-bold text-right">Phone:</div>
              <input type="text" className="col-span-3 p-5 border border-blue rounded-lg bg-light-blue" value="123-456-7890"/><br />
            </div>
          <button className="bg-orange hover:bg-dark-orange text-white p-5 rounded-lg w-full">Edit user</button>
        </div>
      </div>
    </div>
  );
}

export default App;
