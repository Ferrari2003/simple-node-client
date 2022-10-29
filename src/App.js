
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);


   const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email= event.target.email.value;
    const user = {name,email}
    console.log(user);

    fetch('http://localhost:5000/users', 
    {
      method:'POST',
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const newUsers = [...users, data]
      setUsers(newUsers); 
    })
    .catch(error => console.error(error))

    event.target.reset();
     
   }

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  },[]);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Name' required/>
        <br />
        <input type="email" name='email' placeholder='Email' required />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h1>Users: {users.length}</h1>
      {
        users.map(user => <h4 key={user._id}>{user.name} {user.email}</h4>)
      }
    </div>
  );
}

export default App;
