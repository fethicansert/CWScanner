import React from 'react'

const Popup = ({ message, setShowPopup, onYesClick, show, id, borderColor, isYesOrNo }) => {
    // console.log(onYesClick);
    return (
        <div
            style={{ border: `2px solid ${borderColor}` }}
            className={!show ? 'popup-message-container' : 'popup-message-container popup-message-container-active'}>
            <p>{message}</p>
            {isYesOrNo
                ? <div className='popup-button-group'>
                    <button onClick={() => onYesClick(id)} className='popup-yes-button'>Evet</button>
                    <button onClick={() => setShowPopup(false)} className='popup-no-button'>Hayır</button>
                </div>
                : <button onClick={() => setShowPopup(false)} className='popup-no-button'>Kapat</button>}
        </div>
    )
}

export default Popup
