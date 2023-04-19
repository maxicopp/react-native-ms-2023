import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e6',
    description: 'A shirt',
    amount: 34.99,
    date: new Date('2022-03-05'),
  },
  {
    id: 'e7',
    description: 'A hat',
    amount: 19.99,
    date: new Date('2022-03-15'),
  },
  {
    id: 'e8',
    description: 'Groceries',
    amount: 67.89,
    date: new Date('2022-03-01'),
  },
  {
    id: 'e9',
    description: 'Movie tickets',
    amount: 25.49,
    date: new Date('2022-04-10'),
  },
  {
    id: 'e10',
    description: 'Dinner with friends',
    amount: 99.99,
    date: new Date('2022-04-15'),
  },
  {
    id: 'e11',
    description: 'A new phone',
    amount: 899.99,
    date: new Date('2022-05-05'),
  },
  {
    id: 'e12',
    description: 'Car insurance',
    amount: 245.79,
    date: new Date('2022-05-20'),
  },
  {
    id: 'e13',
    description: 'New glasses',
    amount: 199.99,
    date: new Date('2022-06-01'),
  },
  {
    id: 'e14',
    description: 'Vacation',
    amount: 1250.0,
    date: new Date('2022-06-15'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;