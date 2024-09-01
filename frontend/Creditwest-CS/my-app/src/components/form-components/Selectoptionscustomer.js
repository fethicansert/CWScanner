import React from 'react';

const SelectOptionscus = ({ label, name, value, options, onChange, placeholder }) => {
    return (
        <div className="form-group-select-options">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(e)}
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

export default SelectOptionscus;