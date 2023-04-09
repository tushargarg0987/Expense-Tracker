import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses({navigation}) {
    const expensesCtx = useContext(ExpensesContext);
    return (
        <ExpensesOutput navigation={navigation} periodName="Total" expenses={expensesCtx.expenses} fallbackText="No expenses recorded at all !" />
    )
}

export default AllExpenses;