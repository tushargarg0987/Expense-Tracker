import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({expenses,periodName,fallbackText}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    
    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses = {expenses}
                periodName={periodName} />
                {content}
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        // backgroundColor: GlobalStyles.colors.primary700,
        backgroundColor: 'black',
        flex:1
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})