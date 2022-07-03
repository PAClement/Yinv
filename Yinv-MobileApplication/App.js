import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './pages/Home';
import MakeInventory from './pages/MakeInventory';
import Parameter from './pages/Parameter';

const tab = createBottomTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    background: '#E4E9F7',
    card: '#E4E9F7',
    text: '#707070',
    notification: 'red',
  },
};

export default function App() {
  return (

    <NavigationContainer theme={MyTheme}>
      <tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name == 'Accueil') {
              iconName = "home"
            } else if (route.name == 'CreateInv') {
              iconName = "clipboard"
            } else if (route.name == 'Parameter') {
              iconName = "settings"
            }

            return <Ionicons name={iconName} size={30} color={color} />
          },
          tabBarActiveTintColor: '#695CFE',
          tabBarInactiveTintColor: '#707070',
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0
          }
        })}
      >
        <tab.Screen name='Accueil' component={Home}
          options={{
            tabBarStyle: { display: "none" },
          }}
        />
        <tab.Screen name='CreateInv' component={MakeInventory} />
        <tab.Screen name='Parameter' component={Parameter} />

      </tab.Navigator>
    </NavigationContainer>
  );
}

