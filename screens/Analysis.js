import {View} from "react-native";
import PlottedPieChart from "../components/Analysis/PieChart";
import { NavigationContainer } from '@react-navigation/native';
import PlottedBarChart from "../components/Analysis/BarChart";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();


function Analysis() {

    return (
    
          <BottomTabs.Navigator screenOptions={({navigation})=> ({
      // headerStyle: {
      //   backgroundColor: GlobalStyles.colors.primary500
      // },
      // headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderTopColor: 'white'
      },
      tabBarActiveTintColor: 'orange',
      // headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => {
      //   navigation.navigate("ManageExpenses")
      // }} />
      headerShown: false
    })}>
      <BottomTabs.Screen
        name="Total Analysis"
        component={PlottedPieChart}
        options={{
          title: 'Total Analysis',
          tabBarLabel: 'Total Analysis',
          tabBarIcon: ({color,size})=> <Ionicons name='calculator' color={color} size={size} />
      }}/>
      <BottomTabs.Screen name='WeeklyAnalysis' component={PlottedBarChart}
      options={{
        title: 'Weekly Analysis',
        tabBarLabel: 'Weekly Analysis',
        tabBarIcon: ({color,size})=> <Ionicons name='calendar' color={color} size={size} />
    }}/>
    </BottomTabs.Navigator>
    
        // <View style={{backgroundColor: 'rgb(242, 242, 242)'}}> 
        //     <PlottedPieChart />
        //     <PlottedBarChart />
            
        // </View>
    )
}

export default Analysis