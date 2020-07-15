import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
const Item = ({ item: { id, title, amount }, deleteExpense, editExpense }) => {
  return (
    <li className='item'>
      <div className='info'>
        <span className='title'>{title}</span>
        <span className='amount'>$ {amount}</span>
      </div>
      <div>
        <button className='edit-btn' aria-label='edit button' onClick={() => editExpense(id)}>
          <MdEdit />
        </button>
        <button className='clear-btn' aria-label='delete button' onClick={() => deleteExpense(id)}>
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default Item;
