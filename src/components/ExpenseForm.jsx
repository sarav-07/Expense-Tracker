import React, { useState } from "react";
import Input from "./Input";
import SelectMenu from "./SelectMenu";

const ExpenseForm = ({
  setExpenses,
  expense,
  setExpense,
  editingRowId,
  setEditingRowId,
  errors,
  setErrors
}) => {
  

  const validationConfig = {
    title: [
      { required: true, message: "Please enter title" },
      { minLength: 1, message: "Title should be at least 2 characters long" },
    ],
    category: [{ required: true, message: "Please select a category" }],
    amount: [
      { required: true, message: "Please enter an amount" },
      { pattern: /^\d+(\.\d{1,2})?$/, message: "Please enter a valid number" },
    ],
  };

  const validate = (formData) => {
    const errorsData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.minLength && value.length < rule.minLength) {
          errorsData[key] = rule.message;
          return true;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validateResult = validate(expense);

    if (Object.keys(validateResult).length) return;

    if (editingRowId) {
      setExpenses((prevState) =>
        prevState.map((prevExpense) => {
          if (prevExpense.id === editingRowId) {
            return { ...expense, id: editingRowId };
          }
          return prevExpense;
        })
      );
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId("");
      return;
    }

    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);
    setExpense({
      title: "",
      category: "",
      amount: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors({});
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        onChange={handleChange}
        error={errors.title}
      />
      <SelectMenu
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOption="Select Category"
        error={errors.category}
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        onChange={handleChange}
        error={errors.amount}
      />
      <button className="add-btn">{editingRowId ? "Save" : "Add"}</button>
    </form>
  );
};

export default ExpenseForm;

// const ExpenseForm = ({ setExpenses }) => {
//   const [expense, setExpense] = useState({
//     title: "",
//     category: "",
//     amount: "",
//   });
//   const [errors, setErrors] = useState({});
//   const validationConfig = {
//     title: [
//       { required: true, message: "Please enter title" },
//       { minLength: 5, message: "Title should be atleast 5 characters long" },
//     ],
//     category: [{ required: true, message: "Please select a category" }],
//     amount: [{ required: true, message: "Please select an amount" }],
//   };

//   const validate = (formData) => {
//     const errorsData = {};

//     Object.entries(formData).forEach(([key, value]) => {
//       validationConfig[key].forEach((rule) => {
//         if (rule.required && !value) {
//           errorsData[key] = rule.message;
//         }
//       });
//     });
//     setErrors(errorsData);
//     return errorsData;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validateResult = validate(expense);
//     if (Object.keys(validateResult).length)
//       return setExpenses((prevState) => [
//         ...prevState,
//         { ...expense, id: crypto.randomUUID() },
//       ]);
//     setExpense({
//       title: "",
//       category: "",
//       amount: "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setExpense((prevValue) => ({ ...prevValue, [name]: value }));
//     setErrors({});
//   };

//   return (
//     <form onSubmit={handleSubmit} className="expense-form">
//       <Input
//         name="title"
//         label="Title"
//         id="title"
//         value={expense.title}
//         onChange={handleChange}
//         error={errors.title}
//       />
//       <SelectMenu
//         label="Category"
//         id="category"
//         name="category"
//         value={expense.category}
//         onChange={handleChange}
//         options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
//         defaultOption="Select Category"
//       />
//       <Input
//         name="amount"
//         label="Amount"
//         id="amount"
//         value={expense.amount}
//         onChange={handleChange}
//         error={errors.amount}
//       />

//       <button className="add-btn">Add</button>
//     </form>
//   );
// };

// export default ExpenseForm;

// getFormData(e.target)
// const expense= {...getFormData(e.target), id: crypto.randomUUID()}
// setExpenses((prevState)=>[...prevState, expense ])
// e.target.reset()

// const getFormData= (form)=>{
//   const formData = new FormData(form);
//   const data={}
//   for (const [key, value] of formData.entries()) {
//     data[key]= value
//   }
//   return data
// }
