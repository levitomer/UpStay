import React from 'react';
import { Select, Label } from './App.style';

const SelectCurrency = ({ currencies, selectedCurrency, onChangeCurrency }) => {
    return (
        <Select>
            <Label>Change Currency: </Label>
            <select
                onChange={e => {
                    onChangeCurrency(e.target.value);
                }}
            >
                {currencies.sort().map(currency => {
                    if (currency === selectedCurrency) {
                        return (
                            <option key={currency} value={currency} selected>
                                {currency}
                            </option>
                        );
                    }

                    return (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    );
                })}
            </select>
        </Select>
    );
};

export default SelectCurrency;
