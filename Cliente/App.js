import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, {useRef,useState,useEffect} from 'react';
import AppNavigator from './appNavigator';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
function App() {

  const notificationListener = useRef();
  const responseListener = useRef();
  const [notification, setNotification] = useState(false);


    useEffect(() => {
      const getPerm = async() => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus
        if(existingStatus !== 'granted'){
          const { lastStatus } = await Notifications.requestPermissionsAsync();
          finalStatus = lastStatus
        }
        if (finalStatus !== "granted") {
          console.log("Failed to get push token for push notification!");
          return;
        }
      }
      getPerm()

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        console.log("NOTIF: ", notification)
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log("RES: ",response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []) 
  return <AppNavigator />;
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D24F22',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    height:'100%'
  },
});
