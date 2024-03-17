import React from 'react';
import PushNotification from 'react-native-push-notification';

const Notification = () => {
    PushNotification.configure({
        onRegister: function (token) {
            console.log('TOKEN:', token);
        },
        onNotification: function (notification) {
            console.log('NOTIFICATION:', notification);
        },
        onAction: function (notification) {
            console.log('ACTION:', notification.action);
            console.log('NOTIFICATION:', notification);
        },
        onRegistrationError: function (err) {
            console.error('REGISTRATION ERROR:', err);
        },
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    });

    const scheduleNotification = () => {
        PushNotification.localNotificationSchedule({
            title: 'Local Notification',
            message: 'This is a local notification!',
            date: new Date(Date.now() + 60 * 1000), // 1 minute from now
            soundName: 'default',
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