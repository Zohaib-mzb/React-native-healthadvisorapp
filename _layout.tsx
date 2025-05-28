import { createDrawerNavigator } from '@react-navigation/drawer';
import { withLayoutContext } from 'expo-router';

const Drawer = createDrawerNavigator();

const DrawerLayout = withLayoutContext(Drawer.Navigator);

export default function Layout() {
  return (
    <DrawerLayout
      screenOptions={{
        headerStyle: { backgroundColor: '#001f3f' },
        headerTintColor: '#fff',
        drawerStyle: { backgroundColor: '#001f3f' },
        drawerLabelStyle: { color: 'white' },
      }}
    >
      <DrawerLayout.Screen
        name="health-articles"
        options={{ title: 'Health Articles' }}
      />
    </DrawerLayout>
  );
}
