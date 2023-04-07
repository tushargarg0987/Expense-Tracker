import { useContext,useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/storage";

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getData() {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses);
        }
        getData();
    }, [])

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);
        return expense.date > date7daysAgo;
    })

    return (
        <ExpensesOutput expenses={recentExpenses} periodName="Last 7 days" fallbackText="No expenses in last 7 days" />
    )
}

export default RecentExpenses;