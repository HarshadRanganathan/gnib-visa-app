import firebase from 'firebase';

const config = {
    messagingSenderId: '933241589730'
};

firebase.initializeApp(config);

// initialize messaging
let messaging;
if(firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
}

// register service worker & handle push events
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            updateViaCache: 'none'
        });
        messaging.useServiceWorker(registration);
        messaging.onMessage((payload) => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.body,
                icon: payload.notification.icon,
                actions: [
                    {
                        action: payload.fcmOptions.link,
                        title: 'Book Appointment'
                    }
                ]
            };
            registration.showNotification(title, options);           
        });
    });
}

export {
    messaging
};