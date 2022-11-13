import React, { useEffect } from 'react';

import { Alert, View, Text } from 'react-native';

import messaging from '@react-native-firebase/messaging';

async function getFCMToken() {
	const token = await messaging().getToken();
	console.log(token);
}

function App() {
	getFCMToken();

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert('FCM Title: ' + remoteMessage.notification.title, 'FCM Body: ' + remoteMessage.notification.body);
		});

		return unsubscribe;
	}, []);

	return (
		<View>
			<Text>Android Push Notifications</Text>
		</View>
	)
}

export default App;
