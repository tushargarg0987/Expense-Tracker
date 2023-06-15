import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/style";
import { getFormatedDate } from "../../util/date";


function ExpenseItem({ id, description, amount, date, category }) {
    const navigation = useNavigation();

    function expensePressHandler() {
        navigation.navigate('ManageExpenses', {
            expenseId: id
        });
    }

    return (
        <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>{description}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textBase}>{getFormatedDate(date)}</Text>
                        <Text style={styles.categoryText}>{category}</Text>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount.toFixed(2)}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        // backgroundColor: GlobalStyles.colors.primary500,
        backgroundColor: '#5283ff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4
    },
    textBase: {
        // color: GlobalStyles.colors.primary50,
        color: 'white'
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold'
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        // color: GlobalStyles.colors.primary500,
        color: 'black',
        fontWeight: 'bold'
    },
    categoryText: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginLeft: 20,
        width: 100,
        textAlign: 'center',
        height: 20,
    }
})