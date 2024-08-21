import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/public/login/LoginScreen';
import RegisterScreen from '../screens/public/register/RegisterScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

export const PublicTabs = () => {
    return (
        <Tab.Navigator>
          <Tab.Screen name="Login" component={LoginScreen} options={
            {
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />
            }
          }/>
          <Tab.Screen name="Register" component={RegisterScreen} options={
            {
              tabBarIcon: ({ color }) => <FontAwesome size={28} name="sign-in" color={color} />
            }
          }/>
        </Tab.Navigator>
    );
}