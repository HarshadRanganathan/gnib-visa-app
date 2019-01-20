const _ = require('lodash');
const low = require('lowdb');
const Memory = require('lowdb/adapters/Memory');
const { buildPlatformMessage, sendFcmMessage } = require('./firebase');
const { CATEGORIES, TYPES, fetchGnibAppointmentAvailDts } = require('./gnib');

const db = low(new Memory());
db.defaults({"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[]}},"Other":{"New":{"slots":[]},"Renewal":{"slots":[]}}})
  .write();

const GNIB_APPT_NOTIFICATIONS_TOPIC = 'gnibApptNotifications';

function updateDb(objPath, update) {
    db.get(objPath).unset('slots').write();
    db.get(objPath).assign(update).write();
}

async function checkGnibAppointments() {
    const appts = await fetchGnibAppointmentAvailDts();

    if(appts) {
        _.forEach(CATEGORIES, ({category}) => {
            _.forEach(TYPES, ({type}) => {
                const {slots: prevSlots=[]} = db.get(`${category}.${type}`).value();
                const {slots: curSlots=[]} = _.get(appts, `${category}.${type}`);   
                
                if(!_.isEmpty(curSlots)) {
                    const newAppts = _.isNil(prevSlots) || _.isEmpty(prevSlots)? curSlots:_.differenceWith(curSlots, prevSlots, _.isEqual);
                    if(!_.isEmpty(newAppts)) {
                        const body = _.join(_.map(newAppts, 'time'), '\n');
                        const message = buildPlatformMessage(GNIB_APPT_NOTIFICATIONS_TOPIC, `${category} - ${type}`, body);
                        sendFcmMessage(message);
                    }
                    updateDb(`${category}.${type}`, { slots: curSlots });
                } else {
                    if(!_.isEqual(prevSlots, curSlots)) {
                        updateDb(`${category}.${type}`, { slots: curSlots });
                    }
                }
            });
        });
    }
}

module.exports = {
    db,
    checkGnibAppointments
}