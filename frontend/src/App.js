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
    <div className="flex items-center h-full w-full">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center">Users</h1>
        <ul>
          {users && users.map((user, index) => (
            <li key={index} className="border p-4 my-2">
              <p className="font-bold">{user.firstName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
