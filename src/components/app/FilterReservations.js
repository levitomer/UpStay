import React from 'react';
import { Input } from './app.style';

const FilterReservations = ({ onFilterReservations }) => {
    return (
        <Input
            type="text"
            onChange={e => {
                onFilterReservations(e.target.value);
            }}
            placeholder="Filter by uuid"
        />
    );
};

export default FilterReservations;
