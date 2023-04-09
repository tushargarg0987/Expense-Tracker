import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpenses from './screens/ManageExpenses';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/style';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './components/ExpensesOutput/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Analysis from './screens/Analysis';

const Drawer = createDrawerNavigator();


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
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
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color,size})=> <Ionicons name='hourglass' color={color} size={size} />
      }}/>
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color,size})=> <Ionicons name='calendar' color={color} size={size} />
    }}/>
    </BottomTabs.Navigator>
  )
}

function Home() {
  return (
    <Stack.Navigator screenOptions={{
      // headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
      // headerTintColor: 'white'
      headerShown: false
    }}> 
      
      <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{
        headerShown: false
      }} />
      <Stack.Screen name='ManageExpenses' component={ManageExpenses} options={{
        presentation: 'modal',
      }} />
      </Stack.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
          <Drawer.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#2E67F8'},
            headerTintColor: 'white'
          }}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Analysis" component={Analysis} />
        </Drawer.Navigator>
        </NavigationContainer>
        </ExpensesContextProvider>
    </>
    );
}