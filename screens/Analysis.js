import { useContext } from "react";
import { Text, View ,Dimensions} from "react-native";
import { ExpensesContext } from "../store/expenses-context";
import { PieChart,BarChart } from "react-native-chart-kit";

const weekDays = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat']

function Analysis() {
    const expensesCtx = useContext(ExpensesContext);
    let total = 0;
    // console.log(expensesCtx.expenses);
    // const result = expensesCtx.expenses.group(({ category }) => category);
    // console.log(Object.keys(expensesCtx.expenses).length);
    const listValues = [
        {key:'1', value:'Grocery'},
        {key:'2', value:'Food and Drinks'},
        {key:'3', value:'Bills'},
        {key:'4', value:'Transport'},
        {key:'5', value:'Vehicle Maintainance'},
        {key:'6', value:'Entertainment'},
        {key:'7', value:'Miscellaneous'},
    ]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800', 'blue','green']
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
        <View style={{backgroundColor: 'rgb(242, 242, 242)'}}> 

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

            <View style={{paddingHorizontal: 40,backgroundColor:'rgb(242, 242, 242)'}}>
                {arr.map((component) => {
                    return (
                        <View key={component.key} style={{flexDirection: "row",marginVertical: 8}}>
                            <View style={{ height: 20, width: 20, backgroundColor: component.color, borderRadius: 10 }}></View>
                            <Text>  {((component.expense / total) * 100).toFixed(1)}% { component.name}</Text>
                        </View>
                    )
                })}
            </View>
            <Text>Weekly Analysis</Text>
            <BarChart
                // style={graphStyle}
                data={data}
                width={Dimensions.get('window').width - 10}
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

export default Analysis