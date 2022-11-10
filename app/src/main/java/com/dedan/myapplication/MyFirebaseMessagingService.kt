package com.dedan.myapplication

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {
    private val TAG="FCM-SERVICE"

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d(TAG,message.toString())
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG,"New Token: $token")
    }
}