import React, { useState } from "react";
import DataList from "./components/DataList";
import "./App.css";
import data from "./components/data.js";
import ExpenseForm from "./components/ExpenseForm.jsx";
import { useLocalStorage } from "./components/hooks/useLocalStorage.jsx";

const App = () => {
  const [expenses, setExpenses] = useLocalStorage('expenses', data);
  const [expense, setExpense] = useLocalStorage('expense  ',{
    title: "",
    category: "",
    amount: "",
  });
  const [editingRowId, setEditingRowId] = useLocalStorage('editingRowId',"");
  const [errors, setErrors] = useState({});
  return (
    <main>
      <h1>Track Your Expense</h1>
      <div className="expense-tracker">
        <ExpenseForm
          setExpenses={setExpenses}
          expense={expense}
          setExpense={setExpense}
          editingRowId={editingRowId}
          setEditingRowId={setEditingRowId}
          errors={errors}
          setErrors={setErrors}
        />
        <DataList
          expenses={expenses}
          setExpenses={setExpenses}
          setExpense={setExpense}
          setEditingRowId={setEditingRowId}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </main>
  );
};

export default App;
