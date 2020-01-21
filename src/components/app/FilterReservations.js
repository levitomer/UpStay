import React from 'react';
import { Input } from './App.style';

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
