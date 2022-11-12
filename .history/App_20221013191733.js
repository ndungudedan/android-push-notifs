import React, { useEffect } from 'react';

import { Alert } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
  

function App() {
	requestUserPermission();

useEffect(() => {

const unsubscribe = messaging().onMessage(async remoteMessage => {

Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

});

  

return unsubscribe;

}, []);

return (<Text>Push Notifications</Text>)
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
