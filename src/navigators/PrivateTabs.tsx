import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/private/home/HomeScreen';
import { QrReaderScreen } from '../screens/private/home/QrReader';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Pressable } from 'react-native';
import { logoutAsync } from '../services/authService';


const Tab = createBottomTabNavigator();
export const PrivateTabs = () => {

  const handleLogout = async () => {
    await logoutAsync();
  }

  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={
          {
            title: 'Map',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
            headerRight: () => (
              <Pressable onPress={handleLogout}>
                {({ pressed }) => (
                  <FontAwesome
                    name="sign-out"
                    size={25}
                    color={'light'}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
            </Pressable>
            )
          }
        }/>
        <Tab.Screen name="QrReader" component={QrReaderScreen} options={
          {
            title: 'Barcode',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="camera" color={color} />
          }
        }/>
      </Tab.Navigator>
  );
}