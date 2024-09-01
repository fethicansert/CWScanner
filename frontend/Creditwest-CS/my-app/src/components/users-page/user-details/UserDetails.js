import React, { useEffect, useState } from 'react'
import UserDetailsPermissions from './UserDetailsPermissions'
import UserDetailsSelectedPermissions from './UserDetailsSelectedPermissions'
import UserDetailsButtons from './UserDetailsButtons'
import UserInfos from './UserInfos'
import useAuth from '../../../hooks.js/useAuth'


const UserDetails = ({ currentUser, setCurrentUser, setShowPopup, setPopupOptions, newPassword, setNewPassword }) => {

    const [permissions, setPermissions] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        const getData = async () => {
            try {
                const permisionResponse = await fetch('http://127.0.0.1:8000/permissions/')
                const permissionData = await permisionResponse.json();
                setPermissions(permissionData)
            } catch (e) {
                console.log(e);
            }
        }
        getData()
    }, [])

    const selectPermission = (perId) => {
        const selectedPermission = permissions.find(per => per.id === perId)
        const updatedCurrentUserPermissions = [...currentUser.user_permissions, selectedPermission]
        setCurrentUser({ ...currentUser, user_permissions: updatedCurrentUserPermissions })


        const updatedPermissions = permissions.filter(per => per.id !== perId)
        setPermissions(updatedPermissions)
    }

    const removePermission = (perID) => {
        const removedPermission = currentUser.user_permissions.find(per => per.id === perID)
        setPermissions([removedPermission, ...permissions])

        const updatedCurrentUserPermissions = currentUser.user_permissions.filter(per => per.id !== perID)
        setCurrentUser({ ...currentUser, user_permissions: updatedCurrentUserPermissions })
    }


    return (
        <div className="users-page-user-details ">

            <UserInfos
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
            />

            <UserDetailsPermissions
                permissions={permissions}
                selectPermission={selectPermission}
            />

            <UserDetailsSelectedPermissions
                selectedPermissions={currentUser.user_permissions}
                removePermission={removePermission}
            />

            <UserDetailsButtons
                setPopupOptions={setPopupOptions}
                setShowPopup={setShowPopup}
                id={currentUser.id}
            />

        </div>
    )
}

export default UserDetails
