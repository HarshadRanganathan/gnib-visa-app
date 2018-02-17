import _ from 'lodash';

export default function(state={}, action) {
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    return { time };
}