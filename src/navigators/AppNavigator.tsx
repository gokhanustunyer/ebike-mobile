import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { PrivateTabs } from "./PrivateTabs";
import { PublicTabs } from "./PublicTabs";
import { useEffect } from "react";
import { checkAuthToken } from "../redux/reducers/authReducer";

export const AppNavigator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const Stack = createStackNavigator();
    // const isAuthenticated = true;
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    useEffect(() => {
      dispatch(checkAuthToken());
    }, [dispatch]);
    
    return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="PrivateTabs" component={PrivateTabs} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="PublicTabs" component={PublicTabs} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
    )
  }

export default AppNavigator;