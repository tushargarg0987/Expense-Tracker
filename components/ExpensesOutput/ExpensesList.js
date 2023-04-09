import { FlatList} from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return (
        <ExpenseItem {...itemData.item} />
    )
}

function ExpensesList({expenses}) {
    return (
        <FlatList data={expenses}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
)}

export default ExpensesList;