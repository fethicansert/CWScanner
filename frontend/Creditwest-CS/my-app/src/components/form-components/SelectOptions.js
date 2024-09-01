import React from 'react'
import { v4 as uuid } from 'uuid';

const SelectOptions = ({ label, name, value, options, onChange, placeholder }) => {

    return (
        <div className="form-group-select-options">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => {
                    onChange(e);
                }}
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.id} value={option.id ? option.id : option.branch_id}>
                        {option.name ? option.name : option.branch_name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectOptions;