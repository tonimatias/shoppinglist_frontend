import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const URL = 'http://localhost/shoppinglist/';

function App() {
  const [items, setItems] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  
  
  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data);
      }).catch(error => {
        alert(error);
      });
  }, [items]) // joutuu päivittämään sivun jos ei ole items tuossa..
  
  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:description, amount:amount});
    axios.post(URL + 'add.php',json, {
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then ((response) => {
      setItems(items => [...items,response.data]);
      setDescription('');
      setAmount('');
    }).catch(error => {
      alert(error.response ? error.response.data.error : error);
    })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((items) => items.id !== id);
      setItems(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    });
  }

  return (
    <div>
      <form onSubmit={save}>
        <h1>Shopping list</h1>
        <input value={description} placeholder='Type description' onChange={e => setDescription(e.target.value)} />
        <input value={amount} type={'number'} placeholder='Type amount' onChange={e => setAmount(e.target.value)} />
        <button>Add</button>
      </form>
      <ul>
        {items?.map(items => ( // kysymysmerkki items?.map kohdalle ehkä
          <li key={items.id}>
            {items.description} {items.amount} &nbsp;
            <a href='#' className='delete' onClick={() => remove(items.id)}> Delete</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
