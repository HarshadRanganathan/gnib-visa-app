const { buildPlatformMessage, sendFcmMessage } = require('../firebase');
const { fetchGnibAppointmentAvailDts } = require('../gnib');
const { db, checkGnibAppointments } = require('../gnib_appointment_notifications');

jest.mock('../firebase');
jest.mock('../gnib');

describe('Check for new GNIB appointments', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should update db and send no notifications incase of empty appointments', async () => {
        const appts = {"Work":{"New":{"empty":"TRUE"},"Renewal":{"empty":"TRUE"}},"Study":{"New":{"empty":"TRUE"},"Renewal":{"empty":"TRUE"}},"Other":{"New":{"empty":"TRUE"},"Renewal":{"empty":"TRUE"}}};
        const expected = {"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[]}},"Other":{"New":{"slots":[]},"Renewal":{"slots":[]}}};
        
        fetchGnibAppointmentAvailDts.mockReturnValue(appts);
        await checkGnibAppointments();
        
        expect(db.getState()).toEqual(expected);
    });
    it('should update db and send no notifications incase of empty slots', async() => {
        const appts = {"Work":{"New":{"slots":[]},"Renewal":{"empty":"TRUE"}},"Study":{"New":{"empty":"TRUE"},"Renewal":{"slots":[]}},"Other":{"New":{"empty":"TRUE"},"Renewal":{"empty":"TRUE"}}};
        const expected = {"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[]}},"Other":{"New":{"slots":[]},"Renewal":{"slots":[]}}};
        
        fetchGnibAppointmentAvailDts.mockReturnValue(appts);
        await checkGnibAppointments();
        
        expect(db.getState()).toEqual(expected);
    });
    it('should update db and send notifications incase of new appointments', async() => {
        const appts = {"Other":{"New":{"slots":[{"id":"7FF688B4AF591A34802582100036F7C5","time":"27 February 2018 - 09:00"},{"id":"72EBE86B43941A4D8025821D0036F8B8","time":"12 March 2018 - 09:00"}]},"Renewal":{"empty":"TRUE"}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"}]}},"Work":{"New":{"empty":"TRUE"},"Renewal":{"empty":"TRUE"}}};
        const expected = {"Other":{"New":{"slots":[{"id":"7FF688B4AF591A34802582100036F7C5","time":"27 February 2018 - 09:00"},{"id":"72EBE86B43941A4D8025821D0036F8B8","time":"12 March 2018 - 09:00"}]},"Renewal":{"slots":[]}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"}]}},"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}}};
        
        fetchGnibAppointmentAvailDts.mockReturnValue(appts);
        await checkGnibAppointments();

        expect(buildPlatformMessage.mock.calls[0][1]).toEqual('Study - Renewal');
        expect(buildPlatformMessage.mock.calls[0][2]).toEqual('29 March 2018 - 11:00');
        expect(buildPlatformMessage.mock.calls[1][1]).toEqual('Other - New');
        expect(buildPlatformMessage.mock.calls[1][2]).toEqual('27 February 2018 - 09:00\n12 March 2018 - 09:00');

        expect(sendFcmMessage).toHaveBeenCalledTimes(2);

        expect(db.getState()).toEqual(expected);
    });
    it('should update db and send no notifications incase of fulfilled appointments in category [Other] type [New]', async() => {
        const appts = {"Other":{"New":{"slots":[{"id":"7FF688B4AF591A34802582100036F7C5","time":"27 February 2018 - 09:00"}]},"Renewal":{"slots":[]}},"Study":{"New":{"empty":"TRUE"},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"}]}},"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}}}
        const expected = {"Other":{"New":{"slots":[{"id":"7FF688B4AF591A34802582100036F7C5","time":"27 February 2018 - 09:00"}]},"Renewal":{"slots":[]}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"}]}},"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}}};
        
        fetchGnibAppointmentAvailDts.mockReturnValue(appts);
        await checkGnibAppointments();
        
        expect(buildPlatformMessage).toHaveBeenCalledTimes(0);
        expect(sendFcmMessage).toHaveBeenCalledTimes(0);

        expect(db.getState()).toEqual(expected);
    });
    it('should update db and send notifications incase of new appointments addition in categories [Other, Study] and types [Renewal]', async() => {
        const appts = {"Other":{"New":{"slots":[{"id":"7FF688B4AF591A34802582100036F7C5","time":"27 February 2018 - 09:00"}]},"Renewal":{"slots":[{"id":"7FF688B4AF591A34802582100036F712","time":"27 February 2018 - 09:00"}]}},"Study":{"New":{"empty":"TRUE"},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"},{"id":"C46CC181B3CE60CA8025822E00378655","time":"29 March 2018 - 12:00"}]}},"Work":{"New":{"empty":"TRUE"},"Renewal":{"slots":[]}}}
        const expected = {"Other":{"New":{"slots":[{"id":"7FF688B4AF591A34802582100036F7C5","time":"27 February 2018 - 09:00"}]},"Renewal":{"slots":[{"id":"7FF688B4AF591A34802582100036F712","time":"27 February 2018 - 09:00"}]}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"},{"id":"C46CC181B3CE60CA8025822E00378655","time":"29 March 2018 - 12:00"}]}},"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}}}
        
        fetchGnibAppointmentAvailDts.mockReturnValue(appts);
        await checkGnibAppointments();
        
        expect(buildPlatformMessage.mock.calls[0][1]).toEqual('Study - Renewal');
        expect(buildPlatformMessage.mock.calls[0][2]).toEqual('29 March 2018 - 12:00');
        expect(buildPlatformMessage.mock.calls[1][1]).toEqual('Other - Renewal');
        expect(buildPlatformMessage.mock.calls[1][2]).toEqual('27 February 2018 - 09:00');

        expect(sendFcmMessage).toHaveBeenCalledTimes(2);

        expect(db.getState()).toEqual(expected);
    });
    it('should update db and send no notifications incase of fulfilled appointments in category [Other] type [New]', async() => {
        const appts = {"Other":{"New":{"empty":"TRUE"},"Renewal":{"slots":[{"id":"7FF688B4AF591A34802582100036F712","time":"27 February 2018 - 09:00"}]}},"Study":{"New":{"empty":"TRUE"},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"},{"id":"C46CC181B3CE60CA8025822E00378655","time":"29 March 2018 - 12:00"}]}},"Work":{"New":{"empty":"TRUE"},"Renewal":{"slots":[]}}}
        const expected = {"Other":{"New":{"slots":[]},"Renewal":{"slots":[{"id":"7FF688B4AF591A34802582100036F712","time":"27 February 2018 - 09:00"}]}},"Study":{"New":{"slots":[]},"Renewal":{"slots":[{"id":"C46CC181B3CE60CA8025822E00370655","time":"29 March 2018 - 11:00"},{"id":"C46CC181B3CE60CA8025822E00378655","time":"29 March 2018 - 12:00"}]}},"Work":{"New":{"slots":[]},"Renewal":{"slots":[]}}}
        
        fetchGnibAppointmentAvailDts.mockReturnValue(appts);
        await checkGnibAppointments();
        
        expect(buildPlatformMessage).toHaveBeenCalledTimes(0);
        expect(sendFcmMessage).toHaveBeenCalledTimes(0);
        expect(db.getState()).toEqual(expected);
    });
});