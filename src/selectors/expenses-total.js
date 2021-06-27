
// Takers in an Array of expenses
export default (expenses) => {

      // reduce over the list of expenses totaling the amount fields
      return expenses.reduce( (total, expense) => total + expense.amount, 0); // Starts with zero which will be the value is an empty array is passed in

};