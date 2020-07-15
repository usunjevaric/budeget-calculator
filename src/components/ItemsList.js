import React from "react";
import Item from "./Item";
import { MdDelete } from "react-icons/md";
const ItemsList = ({ expenses, clearExpenses, deleteExpense, editExpense }) => {
  return (
    <>
      <ul className='list'>
        {expenses.map((item) => (
          <Item item={item} key={item.id} deleteExpense={deleteExpense} editExpense={editExpense} />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className='btn' onClick={clearExpenses}>
          Clear Expenses <MdDelete className='btn-icon' />
        </button>
      )}
    </>
  );
};

export default ItemsList;
