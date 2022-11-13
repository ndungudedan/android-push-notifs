package com.dedan.myapplication

import android.content.Intent
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {
    private val TAG="FCM-SERVICE"

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        Log.d(TAG,message.toString())
        val intent= Intent(applicationContext,MainActivity::class.java)
        intent.putExtra("title", message.notification?.title)
        intent.putExtra("body", message.notification?.body)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        startActivity(intent)
    }

    override fun onNewToken(token: String) {
        super.onNewToken(token)
        Log.d(TAG,"New Token: $token")
    }
}