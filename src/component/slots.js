import _ from 'lodash';
import React from 'react';

const Slots = ({ data: slots }) => {
    return _.map(slots, (slot) => {
        return (
            <tr key={slot.id}>
                <td><span className="mb-1 text-success">{slot.time}</span></td>
                <td><button type="button" className="btn btn-dark btn-sm float-right">Book</button></td>
            </tr>
        );
    });
}

export default Slots;