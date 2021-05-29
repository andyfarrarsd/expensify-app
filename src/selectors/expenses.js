import moment from 'moment';

// set up default function getVisibleExpenses
export default (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => { // this is the function to filter by, true doesnt filter false does
      const createdAtMoment = moment(expense.createdAt);

      // The typeof startDate !== 'number' returns true meaning any non number returns true
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDataMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDataMatch && textMatch;
    }).sort((a, b) => { //takes an array and returns an array
        if (sortBy === 'date') {
          return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
          return a.amount < b.amount ? 1 : -1;
        }
      });
};