import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  
  
  useEffect(() => {
    axios.get(URL)
    .then((response) => {
      //console.log(response.data)
      setItems(response.data);
    }).catch(error => {
      alert(error);
    });
  },[])
  
  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then ((response) => {
      setItems(item => [...item,response.data]);
      setItem('');
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  return (
    <div>
      <form onSubmit={save}>
        <h1>Shopping list</h1>
        <input placeholder='Type description' onChange={e => setItem(e.target.value)} />
        <input type={'number'} placeholder='Type amount' onChange={e => setItem(e.target.value)}/>
        <button>Add</button>
      </form>
      <ol>
        {items?.map(item =>(
          <li key={item.id}>{item.description} {item.amount}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;
