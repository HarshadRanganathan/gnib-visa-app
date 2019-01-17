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

// register service worker
window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
            updateViaCache: 'none'
        });
        registration.update();
        messaging.useServiceWorker(registration);
    }
});

export {
    messaging
};