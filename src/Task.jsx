import React from "react";
import classNames from 'classnames'

const Task = ({id, done, text, onChange, onDelete}) => {
  
  const listItemClass = classNames('list-item', {'list-item_done': done});
  return (
    <li className={listItemClass}>
      <input
        className="list-item__checkbox"
        type="checkbox"
        defaultChecked={done}
        onChange={() => onChange(id)}
      />
      <span className="list-item__text">{text}</span>
      <button className="list-item__delete-btn" onClick={() => onDelete(id)}></button>
    </li>
  );
};

export default Task;
