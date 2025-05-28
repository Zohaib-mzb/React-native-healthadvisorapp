import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="tabs">
          <Drawer.Screen name="tabs" component={Slot} options={{ title: 'Main App' }} />
          <Drawer.Screen name="health-articles" component={require('./(drawer)/health-articles').default} options={{ title: 'Health Articles' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
