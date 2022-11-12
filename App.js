import React, { useEffect } from 'react';

import { Alert, View, Text } from 'react-native';

import messaging from '@react-native-firebase/messaging';


function App() {

	const fcmToken = async () => {
		if (fcmToken) {
			const token = await messaging().getToken();
			console.log(token);
		}
	}

	useEffect(() => {
		const unsubscribe = messaging().onMessage(async remoteMessage => {
			Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
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
