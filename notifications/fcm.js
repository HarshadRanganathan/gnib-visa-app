const { google } = require('googleapis');
const axios = require('axios');
const serviceAccount = require('');

const FCM_SEND_API = 'https://fcm.googleapis.com/v1/projects/gnib-visa-app/messages:send';
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];

async function getAccessToken() {
    try {
        const jwtClient = new google.auth.JWT(
            serviceAccount.client_email,
            null,
            serviceAccount.private_key,
            SCOPES,
            null
        );
        const oAuthCred = await jwtClient.authorize();
        return oAuthCred.access_token;
    } catch(err) {
        console.log(err);
    }
}

function buildCommonMessage(title, body) {
    return {
        'message': {
            'notification': {
                'title': title,
                'body': body
            }
        }
    };
}

function buildPlatformMessage(token, title, body) {
    const fcmMessage = buildCommonMessage(title, body);
    
    const webpush = {
        'headers': {
            'TTL': '0'
        },
        'notification': {
            'icon': 'https://img.icons8.com/color/96/e74c3c/ireland.png'
        },
        'fcm_options': {
            'link': 'https://burghquayregistrationoffice.inis.gov.ie/Website/AMSREG/AMSRegWeb.nsf/AppSelect?OpenForm'
        }
    };

    fcmMessage['message']['token'] = token;
    fcmMessage['message']['webpush'] = webpush;
    return fcmMessage;
}

function sendFcmMessage(accessToken, fcmMessage) {
    return axios({
        method: 'POST',
        url: `${FCM_SEND_API}`,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: fcmMessage
    })
    .catch((err) => {
        console.log(err);
    });
}