import { createContext, useReducer } from "react";

// const DUMMY_EXPENSE = [
//     {
//         id: 'e1',
//         description: 'A pair of shoes',
//         amount: 59.99,
//         date: new Date('2023-02-19')
//     },
//     {
//         id: 'e2',
//         description: 'A watch',
//         amount: 40.00,
//         date: new Date('2023-03-02')
//     },
//     {
//         id: 'e3',
//         description: 'A pair of trousers',
//         amount: 25.00,
//         date: new Date('2023-03-01')
//     },
//     {
//         id: 'e4',
//         description: 'A pair of shoes',
//         amount: 59.99,
//         date: new Date('2023-02-19')
//     },
//     {
//         id: 'e5',
//         description: 'A watch',
//         amount: 40.00,
//         date: new Date('2023-03-02')
//     },
//     {
//         id: 'e6',
//         description: 'A pair of trousers',
//         amount: 25.00,
//         date: new Date('2023-03-01')
//     },{
//         id: 'e7',
//         description: 'A pair of shoes',
//         amount: 59.99,
//         date: new Date('2023-02-19')
//     },
//     {
//         id: 'e8',
//         description: 'A watch',
//         amount: 40.00,
//         date: new Date('2023-03-02')
//     },
//     {
//         id: 'e9',
//         description: 'A pair of trousers',
//         amount: 25.00,
//         date: new Date('2023-03-27')
//     }
// ]

export const ExpensesContext = createContext({
    expenses: [],
    setExpenses: (expenses)=>{},
    addExpense: ({description,amount,date})=>{},
    deleteExpense: (id)=>{},
    updateExpense: (id, {description, amount,date})=>{},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state];
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload)
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data };
            const updatedExpense = [...state];
            updatedExpense[updatableExpenseIndex] = updatedItem;
            return updatedExpense;
        default:
            return state;
    }
}

function ExpensesContextProvider({ children }) {
    const [expensesState,dispatch] = useReducer(expensesReducer, []);

    function addExpense( expenseData ) {
        dispatch({type: 'ADD',payload: expenseData});
    }

    function setExpenses(expenses) {
        dispatch({type: 'SET',payload: expenses})
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({
            type: 'UPDATE', payload: {
                id: id,
                data: expenseData
        }});
    }

    const value = {
        expenses: expensesState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }
    return (<ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider