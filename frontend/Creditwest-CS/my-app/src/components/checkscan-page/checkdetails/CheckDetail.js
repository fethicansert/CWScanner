
import React from 'react';

function CheckDetail({ label, text, setCurrentCheck, state, disabled }) {

    return (
        <div className="check-detail-label-group">
            <label className="check-detail-label">{label}</label>
            <input disabled={disabled} value={text} onChange={(e) => {
                setCurrentCheck(prev => {
                    console.log(state);
                    return { ...prev, [state]: e.target.value }
                })
            }} className="check-detail-text" />
        </div>

    );
}


export default CheckDetail



