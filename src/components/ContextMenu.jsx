import React from "react";

const ContextMenu = ({
  menuPosition,
  setMenuPosition,
  rowId,
  expenses,
  setExpenses,
  setExpense,
  setEditingRowId,
  setErrors
}) => {
  const handleEdit = () => {
    const {title, category, amount} = expenses.find((expense) => expense.id === rowId);
    setExpense({title, category, amount
    });
    setEditingRowId(rowId)
    setErrors({})
    setMenuPosition({});
  };

  const handleDelete = () => {
    setExpenses((prevState) =>
      prevState.filter((expense) => expense.id !== rowId)
    );
    setMenuPosition({});
  };
  if (!menuPosition.left) return;

  return (
    <div className="context-menu" style={menuPosition}>
      <div onClick={handleEdit}>Edit</div>
      <div onClick={handleDelete}>Delete</div>
    </div>
  );
};

export default ContextMenu;
