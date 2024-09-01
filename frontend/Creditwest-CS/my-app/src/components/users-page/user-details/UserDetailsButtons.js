import React from 'react'

const UserDetailsButtons = ({ setShowPopup, setPopupOptions, }) => {

    return (
        <div className='user-list-details-button-column'>
            <button
                onClick={() => {
                    setShowPopup(true)
                    setPopupOptions({
                        message: "kullanıcsını güncellemek  istediğinize eminmisiniz ?",
                        function: "update"
                    })
                }}
                className='user-list-update-button'>
                Güncelle
            </button>
            <button
                onClick={() => {
                    setShowPopup(true)
                    setPopupOptions({
                        message: "kullanıcısını silmek istediginize eminmisiniz ?",
                        function: "delete"
                    })
                }}
                className='user-list-delete-button'>
                Sİl
            </button>
        </div>
    )
}

export default UserDetailsButtons
