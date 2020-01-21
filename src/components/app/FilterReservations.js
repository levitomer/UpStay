import React from 'react';
import {} from './App.style';

const FilterReservations = ({ onFilterReservations }) => {
    return (
        <input
            type="text"
            onChange={e => {
                onFilterReservations(e.target.value);
            }}
            placeholder="Filter by uuid"
        />
    );
};

export default FilterReservations;
