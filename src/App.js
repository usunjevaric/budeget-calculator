import React, { useState, useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import Form from "./components/Form";
import ItemsList from "./components/ItemsList";
import uuid from "uuid/dist/v4";

// const initialExpenses = [
//   { id: uuid(), title: "Rent", amount: 150 },
//   { id: uuid(), title: "Food", amount: 250 },
//   { id: uuid(), title: "Car", amount: 350 },
//   { id: uuid(), title: "Computer", amount: 50 },
// ];
//setup initial state
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      if (edit) {
        let newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, title: charge, amount } : item;
        });
        setExpenses(newExpenses);
        handleAlert({ type: "success", text: "Charge updated" });
      } else {
        const newExpense = { id: uuid(), title: charge, amount: amount };
        setExpenses([...expenses, newExpense]);
        handleAlert({ type: "success", text: "Charge added" });
      }
      setAmount("");
      setCharge("");
    } else {
      // TODO handle alert
      handleAlert({
        type: "danger",
        text: `Charge cant't be empty value and amount value has to be bigger than 0`,
      });
    }
  };

  const handleDeleteExpense = (id) => {
    const newExpenses = expenses.filter((item) => item.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "Item deleted" });
  };

  const handleEditExpense = (id) => {
    setEdit(true);
    setId(id);
    const itemForEdit = expenses.find((expense) => expense.id === id);
    setCharge(itemForEdit.title);
    setAmount(itemForEdit.amount);
  };

  //delete all expenses
  const clearAllExpenses = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All items are deleted" });
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className='App'>
        <Form
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ItemsList
          expenses={expenses}
          clearExpenses={clearAllExpenses}
          deleteExpense={handleDeleteExpense}
          editExpense={handleEditExpense}
        />
      </main>
      <h1>
        total spending:{" "}
        <span className='total'>
          $
          {expenses.reduce((acc, cur) => {
            return acc + parseInt(cur.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
