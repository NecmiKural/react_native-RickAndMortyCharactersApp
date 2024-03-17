import React from 'react';
import PushNotification from 'react-native-push-notification';

const Notification = () => {
    PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token) {
            console.log('TOKEN:', token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);

            // Process the notification
            // For example, navigate to a specific screen or show a dialog
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification) {
            console.log('ACTION:', notification.action);
            console.log('NOTIFICATION:', notification);

            // Process the action
            // For example, navigate to a specific screen or perform an action based on the notification action
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the deviceis a simulator. (iOS)
        onRegistrationError: function (err) {
            console.error('REGISTRATION ERROR:', err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },

        // Should the initial notification be popped automatically
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotifications.requestPermissions() later
         */
        requestPermissions: true,
    });

    // Schedule a local notification
    const scheduleNotification = () => {
        PushNotification.localNotificationSchedule({
            // (required) Title of the notification
            title: 'Local Notification',

            // (required) Body of the notification
            message: 'This is a local notification!',

            // (optional) Date and time to trigger the notification
            date: new Date(Date.now() + 60 * 1000), // 1 minute from now

            // (optional) Sound to play when the notification is triggered
            soundName: 'default',

            // (optional) Number of times to repeat the notification
            repeatType: 'time',
            repeatTime: 60, // 1 minute
        });
    };

    return (
        <>
            <button title="Schedule Notification" onPress={scheduleNotification} />
        </>
    );
};

export default Notification;