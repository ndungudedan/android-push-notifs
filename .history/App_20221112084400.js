import React, { useEffect } from 'react';

import { Alert } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
  

async function App() {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
		   console.log(fcmToken);
		} 	
	
		// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.				
		
		//Method for handling notifications received while app in foreground
		
		OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
		
		console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
		
		let notification = notificationReceivedEvent.getNotification();
		
		console.log("notification: ", notification);
		
		const data = notification.additionalData
		
		console.log("additionalData: ", data);
		
		// Complete with null means don't show a notification.
		
		notificationReceivedEvent.complete(notification);
		
		});
		
		  
		
		//Method for handling notifications opened
		
		OneSignal.setNotificationOpenedHandler(notification => {
		
		console.log("OneSignal: notification opened:", notification);
		
		});
}

async function requestUserPermission() {

	const authStatus = await messaging().requestPermission();
	
	const enabled =
	
	authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
	
	authStatus === messaging.AuthorizationStatus.PROVISIONAL;
	
	  
	
	if (enabled) {
	
	console.log('Authorization status:', authStatus);
	
	}
	
	}


export default App;