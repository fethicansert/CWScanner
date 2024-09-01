import React from 'react';

function InputComponent({ label, id, type, value, onChange, placeholder }) {
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        let processedValue;

        if (type === 'tel') {
            processedValue = inputValue.replace(/[^0-9]/g, ""); // Sadece rakamları kabul eder
        } else if (type === 'text') {
            processedValue = inputValue.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ\s]/g, ''); // Sadece harfleri kabul eder
        } else {
            processedValue = inputValue; // Diğer türler için hiçbir işlem yapmaz
        }

        onChange({ target: { id, value: processedValue, name: id } });
    };

    return (
        <div className="form-group-register">
            <label htmlFor={id}>{label}</label>
            <input
                autoComplete='off'
                type={type}
                id={id}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                required
                name={id}
            />
        </div>
    );
}

export default InputComponent;
