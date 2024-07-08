import React from "react";

const Item = ({
  dataItem:{title, desc, completed},
  deleteCard,
  toggleCompleted
}) => {

  return <li style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        <h4>{title}</h4>
        <p>{desc}</p>
        <div>
            <label htmlFor="completed">Completed</label>
            <input type="checkbox" name="completed" checked={completed} onChange={toggleCompleted}/>
        </div>
        <article>
        <button onClick={deleteCard}>Delete</button>
        <button>Edit</button>
        </article>
    </li>
};

export default Item;