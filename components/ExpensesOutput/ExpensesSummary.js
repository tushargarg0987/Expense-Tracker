import { View,Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/style";

function ExpensesSummary({expenses,periodName}) {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount
    }, 0)

    return (
        <View style={styles.container}>
            <Text style = {styles.period}>{ periodName}</Text>
            <Text style={styles.sum}>₹{ expensesSum.toFixed(2)}</Text>
        </View>
    )
}

export default ExpensesSummary;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        // backgroundColor: GlobalStyles.colors.primary50,
        backgroundColor: 'white',
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    period: {
        fontSize: 16,
        // color: GlobalStyles.colors.primary400
        color: 'black'
    },
    sum: {
        fontSize: 18,
        fontWeight: 'bold',
        // color: GlobalStyles.colors.primary500
        color: 'black'
    }
})