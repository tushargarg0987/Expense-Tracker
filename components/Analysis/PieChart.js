import { useContext } from "react";
import { Text, View ,Dimensions,StyleSheet} from "react-native";
// import { ExpensesContext } from "../store/expenses-context";
import { ExpensesContext } from "../../store/expenses-context";
import { PieChart} from "react-native-chart-kit";

const weekDays = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

function PlottedPieChart() {
    const expensesCtx = useContext(ExpensesContext);
    let total = 0;
    // console.log(expensesCtx.expenses);
    // const result = expensesCtx.expenses.group(({ category }) => category);
    // console.log(Object.keys(expensesCtx.expenses).length);
    const listValues = [
        {key:'1', value:'Grocery'},
        { key: '2', value: 'Food & Drinks' },
        {key: '3',value: 'Fashion'},
        {key: '4',value: 'Accessories'},
        {key:'5', value:'Bills'},
        {key:'6', value:'Transport'},
        {key:'7', value:'Vehicle'},
        {key:'8', value:'Entertainment'},
        {key:'9', value:'Miscellaneous'},
    ]
    const sliceColor = ['#EB455F','#537FE7','#FFEB3B', '#609966', '#FFB84C', '#00235B','#9DC08B','#8F43EE','#C9EEFF']
    const arr = [];
    for (let ele in listValues) {
        let count=0;
        for (let ele2 in expensesCtx.expenses) {
            if (listValues[ele].value === expensesCtx.expenses[ele2].category) {
                count = count + expensesCtx.expenses[ele2].amount;
            }
        }
        total = total + count;
        arr.push({name: listValues[ele].value,key: listValues[ele].key, expense: count, color: sliceColor[ele],legendFontColor: "#7F7F7F",
        legendFontSize: 15});
    }
    
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
        <View style={[{backgroundColor: 'rgb(242, 242, 242)'},styles.container]}> 

        <PieChart
            data={arr}
            width={Dimensions.get('window').width}
            height={200}
            chartConfig={{
                color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
            }}
            accessor="expense"
            backgroundColor="transparent"
            // paddingLeft="15"
                // absolute
                hasLegend={false}
                center={[Dimensions.get('window').width/4,0]}
            />

            <View style={{paddingHorizontal: 40,backgroundColor:'rgb(242, 242, 242)',marginTop: 30}}>
                {arr.map((component) => {
                    return (
                        <View key={component.key} style={{flexDirection: "row",marginVertical: 8}}>
                            <View style={{ height: 20, width: 20, backgroundColor: component.color, borderRadius: 10 }}></View>
                            <Text>  {((component.expense / total) * 100).toFixed(1)}% { component.name}</Text>
                        </View>
                    )
                })}
            </View>
            <Text>Custom Chart</Text>
            <View style={styles.customChart}>
            </View>
        </View>
    )
}

export default PlottedPieChart

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
    },
    customChart: {
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: 'conic-gradient(pink 0 70deg,orange 0)'
    }
})