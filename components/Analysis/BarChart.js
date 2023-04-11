import { useContext } from "react";
import { Text, Dimensions, View, StyleSheet} from "react-native";
import { ExpensesContext } from "../../store/expenses-context";
import { BarChart } from "react-native-chart-kit";

const weekDays = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

function PlottedBarChart() {
    const expensesCtx = useContext(ExpensesContext);
    // const listValues = [
    //     {key:'1', value:'Grocery'},
    //     {key:'2', value:'Food and Drinks'},
    //     {key:'3', value:'Bills'},
    //     {key:'4', value:'Transport'},
    //     {key:'5', value:'Vehicle Maintainance'},
    //     {key:'6', value:'Entertainment'},
    //     {key:'7', value:'Miscellaneous'},
    // ]
    var pastDays = [];
    var dataDays = [];
    function Last7Days () {
        
        for (var i=0; i<7; i++) {
            var d = new Date();
            d.setUTCHours(0,0,0,0);
            d.setDate(d.getDate() - i);
            pastDays.push(d)
            dataDays.push(weekDays[d.getDay()])
        }
    
        return(pastDays.join(','));
    }
    Last7Days();
    pastDays.reverse();
    dataDays.reverse();
    const arr2 = [];
    for (let ele3 in pastDays) {
        const d2 = new Date(pastDays[ele3])
        let count=0;
        for (let ele4 in expensesCtx.expenses) {
            const d3 = new Date(expensesCtx.expenses[ele4].date)
            if (d2.getTime() === d3.getTime()) {
                count = count + expensesCtx.expenses[ele4].amount;
            }
        }
        arr2.push(count);
    }
    // console.log(arr2);

    const data = {
        labels: dataDays,
        datasets: [
          {
            data: arr2
          }
        ]
    };
    
    return (
        <View style={styles.container}>
        <Text style={styles.textHead}>Weekly Analysis</Text>
            <BarChart
                // style={graphStyle}
                data={data}
                width={Dimensions.get('window').width-20}
                height={220}
                yAxisLabel="₹"
                chartConfig={{color: (opacity = 5) => `rgba(0, 0, 0, ${opacity})`,backgroundColor: "rgb(242, 242, 242)",backgroundGradientFrom: "rgba(242, 242, 242, 0)",
                backgroundGradientTo: "rgba(242, 242, 242, 0)",paddingHorizontal: 10}}
                // verticalLabelRotation={30}
                style={{
                    marginVertical: 8,
                    padding: 4,
                    backgroundColor: 'rgb(242, 242, 242)'
                }}
            />
            </View>
            )
            
}

export default PlottedBarChart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    textHead: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 100
    }
})