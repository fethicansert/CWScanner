import React from 'react'
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { v4 as uuid } from 'uuid';


const UserDetailsSelectedPermissions = ({ selectedPermissions, removePermission }) => {

    return (
        <div className='user-list-user-permissions-column'>

            <h5>Kullanıcıya ait izinler</h5>
            <ul className='user-list-selected-permissions-list'>
                {
                    selectedPermissions?.length > 0
                        ? selectedPermissions.map(per =>
                            <li
                                key={uuid()}
                                onClick={() => removePermission(per.id)}>
                                {per.name}
                                <FaRegArrowAltCircleLeft className='user-page-selected-permission-arrrow-left' />
                            </li>)
                        : <p className='no-permission-text'>Kullanıcıya ait bir izin bulunmuyor !</p>
                }
            </ul>

        </div>
    )
}

export default UserDetailsSelectedPermissions
