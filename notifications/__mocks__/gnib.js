const CATEGORIES = [
    { category: 'Work' }, 
    { category: 'Study' },
    { category: 'Other' }
];
const TYPES = [
    { type: 'New' },
    { type: 'Renewal' }
];

module.exports = {
    CATEGORIES: CATEGORIES,
    TYPES: TYPES,
    fetchGnibAppointmentAvailDts: jest.fn()
}