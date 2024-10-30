import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export const NotificationManager = () => {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const foregroundSubscription = Notifications.addNotificationReceivedListener(handleNotification);
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);

    return () => {
      foregroundSubscription.remove();
      backgroundSubscription.remove();
    };
  }, []);

  const handleNotification = (notification) => {
    console.log('Notificación recibida:', notification);
  };

  const handleNotificationResponse = (response) => {
    console.log('Respuesta a la notificación:', response);
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.error('Permiso para notificaciones no otorgado');
      return;
    }

    const expoPushToken = await Notifications.getExpoPushTokenAsync({
        projectId: '14766b95-7776-4507-b6ef-11454212ad24', // Reemplaza con tu projectId
      });
  };

  return null;
};