import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import data from './data';
import Item from './Item';
import './List.css'

const List = () => {

  const [items, setItems] = useState(data);
  const [values, setValues] = useState({
    title: '',
    desc: '',
    completed: false
  });

  const [formVisible, setFormVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const timerRef = useRef(null);



  const renderItems = () =>
    items.map((item, i) => (
      <Item
        key={uuidv4()}
        dataItem={item}
        deleteCard={() => deleteItem(i)}
        toggleCompleted={() => toggleCompleted(i)}
      />
    ));

  const clearItems = () => setItems([]);

  const resetItems = () => setItems(data);

  const deleteItem = (pos) => {
    const remainingItems = items.filter((item, index) => index !== pos);
    setItems(remainingItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const desc = e.target.desc.value;
    const newItem = { title, desc, completed: false };
    if (values.title.length < 6) {
      setError('Task must be at least 6 characters long');
      return;
    }
    setItems([...items, newItem]);
    setValues({ title: '', desc: '', completed: false });
    setFormVisible(false);
    setError('');
    setMessage('Task added');
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
      
    });
    setError('');
    resetTimer();
  }

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setValues({ title: '', desc: '', completed: false });
      setFormVisible(false);
    }, 20000);
  }

  const showForm = (e) => {
    e.stopPropagation();
    setFormVisible(true);
    resetTimer();
  };

  const hideForm = () => {
    setFormVisible(false);
    setValues({ title: '', desc: '', completed: false });
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const toggleCompleted = (pos) => {
    const newItems = [...items];
    newItems[pos].completed = !newItems[pos].completed;
    setItems(newItems);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, []);

  return <section>
    <article>
      <button onClick={showForm}>Add Task</button>
      <button onClick={clearItems}>Clear</button>
      <button onClick={resetItems}>Reload</button>
    </article>
    {message && <p className="message">{message}</p>}
    {
      formVisible &&
      <article>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Task</label>
            <input type="text" name="title" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <input type="text" name="desc" onChange={handleChange} />
          </div>
          {error && <p>{error}</p>}
          {
            values.title && values.desc ?
              <button type="submit">Add</button> :
              <p>Please complete all fields</p>
          }
        </form>
        <button onClick={hideForm}>Close</button>
      </article>
    }
    <article>
      <ul>
        {renderItems()}
      </ul>
    </article>
  </section>
};

export default List;
