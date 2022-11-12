import React, { useState, useEffect, useRef, setState} from 'react';
import { Text, View } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
};



export  default  function  App() {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const  notificationListener = useRef();
	const  responseListener = useRef();
	useEffect(() => {
	registerForPushNotificationsAsync().then(token  =>  setExpoPushToken(token));
	notificationListener.current = Notifications.addNotificationReceivedListener(notification  => {
	console.log(notification);
	setNotification(notification);
	});
	responseListener.current = Notifications.addNotificationResponseReceivedListener(response  => {
	console.log(response);
	});
	return () => {
	Notifications.removeNotificationSubscription(notificationListener.current);
	Notifications.removeNotificationSubscription(responseListener.current);
	};
	}, []);	

	return (

		<View

			style={{

				flex: 1,

				alignItems: 'center',

				justifyContent: 'space-around',

			}}>

			<Text>Your expo push token: {expoPushToken}</Text>

			<View style={{ alignItems: 'center', justifyContent: 'center' }}>

				<Text>Notification Title: {notification && notification.request.content.title} </Text>

				<Text>Notification Body: {notification && notification.request.content.body}</Text>

				<Text>Notification Data: {notification && JSON.stringify(notification.request.content.data)}</Text>

			</View>

		

		</View>

	);

}