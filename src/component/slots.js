import _ from 'lodash';
import React from 'react';

const Slots = ({ data: slots, link }) => {
    return _.map(slots, (slot) => {
        return (
            <tr key={slot.id}>
                <td><span className="mb-1 text-success">{slot.time}</span></td>
                <td><a href={link} target="_blank" className="btn btn-dark btn-sm float-right">Book</a></td>
            </tr>
        );
    });
}

export default Slots;