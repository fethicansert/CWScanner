import React from 'react';

function UserDetail({ label, value, setCurrentUser, state, type, isReadOnly }) {

    return (
        <div className="check-detail-label-group">
            <label className="check-detail-label">{`${label}:`}</label>

            <input readOnly={isReadOnly} type={type} value={value} onChange={(e) => {
                setCurrentUser(prev => {
                    if (state === 'newPassword') return e.target.value
                    return { ...prev, [state]: e.target.value }
                })
            }} className="check-detail-text" />
        </div>

    );
}


export default UserDetail