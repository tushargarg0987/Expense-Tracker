import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@exp-tracker')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    }
    catch (e) {
        // error reading value
    }
    
}

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@exp-tracker', jsonValue)
    } catch (e) {
      // saving error
    }
}

export async function fetchExpenses() {
    const data = await getData();
    const expenses = [];
    for (const key in data) {
        const expenseObj = {
            id: data[key].id,
            amount: data[key].amount,
            date: new Date(data[key].date),
            description: data[key].description,
            category: data[key].category,
            split : data[key].split
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export async function addExpenses(expense) {
    const data = await getData();
    const id = new Date().toString() + Math.random().toString();
    const newData = [...data, { ...expense, id: id } ];
    await storeData(newData);
    return id
}

export async function updatedExpense(id, expense) {
    const data = await getData();
    // const newData = [...data, { ...expense, id: id }];
    for (const key in data) {
        if (data[key].id === id) {
            
            data[key].amount = expense.amount;
            data[key].date = new Date(expense.date)
            data[key].description = expense.description
            data[key].category = expense.category
            data[key].split = expense.split
        }
        
    }
    await storeData(data);
}

export async function deletedExpense(id) {
    const data = await getData();
    const newData = data.filter((expense) => expense.id!==id)
        await storeData(newData);
    
}


