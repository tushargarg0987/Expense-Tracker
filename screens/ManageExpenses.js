import { Ionicons } from "@expo/vector-icons";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import ExpenseForm from "../components/ExpensesOutput/ManageExpense/ExpenseForm";
import Button from "../components/ExpensesOutput/UI/Button";
import IconButton from "../components/ExpensesOutput/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { ExpensesContext } from "../store/expenses-context";
import { addExpenses, deletedExpense, updatedExpense } from "../util/storage";

function ManageExpenses({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext)
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    
    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation,isEditing])

    async function deleteExpenseHandler() {
        // console.log("To Delete!!");
        expensesCtx.deleteExpense(editedExpenseId);
        await deletedExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }
    
    async function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpenseId, expenseData);
            await updatedExpense(editedExpenseId, expenseData);
        }
        else {
            
            const id = await addExpenses(expenseData)
            expensesCtx.addExpense({ ...expenseData ,id:id});
        }
        navigation.goBack();
    }

    return (
        // <Text>ManageExpenses</Text>
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                isEditing={isEditing}
                defaultValues = {selectedExpense}
            />
            
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                    icon='trash'
                    color='#bb002d'
                    size={36}
                    onPress={deleteExpenseHandler} />
                </View>)}
        </View>
    )
}

export default ManageExpenses;

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white'
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopColor: '#bbbbbb',
        borderTopWidth: 2,
        alignItems: 'center'
    }
})