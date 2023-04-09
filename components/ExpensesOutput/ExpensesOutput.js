import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./UI/IconButton";

function ExpensesOutput({expenses,periodName,fallbackText,navigation}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    
    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <>
        <View style={styles.container}>
            <ExpensesSummary
                expenses = {expenses}
                periodName={periodName} />
                {content}
            </View>
            <TouchableOpacity style={{position: 'absolute', right: 20, bottom: 20,backgroundColor: 'orange',borderRadius: 100,justifyContent: 'center',alignItems: 'center',display: 'flex',}}>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <IconButton icon="add" size={50} color='white' round={true} onPress={() => {
        navigation.navigate("ManageExpenses")
      }} />
            </View>
            </TouchableOpacity>
        </>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        // backgroundColor: GlobalStyles.colors.primary700,
        backgroundColor: 'white',
        // paddingBottom: 40,
        flex:1
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32
    }
})