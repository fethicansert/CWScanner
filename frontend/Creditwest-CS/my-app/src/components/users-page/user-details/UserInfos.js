import React from 'react'
import UserDetail from './UserDetail';

const UserInfos = ({ currentUser, setCurrentUser, }) => {

    return (
        <div className='user-list-details-column-wrapper'>

            <h5 className=''>Kullanıcı bilgileri</h5>

            <div className='flex'>

                <div className='user-list-user-details-column'>

                    <UserDetail isReadOnly={true} label={"id"} value={currentUser.id} setCurrentUser={setCurrentUser} state={'id'} />


                    <UserDetail label={"Kullanıcı Adı"} value={currentUser.username} setCurrentUser={setCurrentUser} state={'username'} />


                    <UserDetail label={"Sifre"} value={currentUser.username} setCurrentUser={setCurrentUser} state={'newPassword'} type={'password'} />

                    <UserDetail label={"Email"} value={currentUser.email} setCurrentUser={setCurrentUser} state={'email'} />


                    <UserDetail label={"Kimlik Numarası"} value={currentUser.employee_id} setCurrentUser={setCurrentUser} state={"employee_id"} />

                </div>

                <div className='user-list-user-details-column'>

                    <UserDetail label={"Ad"} value={currentUser.first_name} setCurrentUser={setCurrentUser} state={"first_name"} />


                    <UserDetail label={"Soyad"} value={currentUser.last_name} setCurrentUser={setCurrentUser} state={"last_name"} />


                    <UserDetail label={"Telefon Numarası"} value={currentUser.phone} setCurrentUser={setCurrentUser} state={"phone"} />


                    <UserDetail label={"Şube Kodu"} value={currentUser.branch} setCurrentUser={setCurrentUser} state={"branch_code"} />


                    <UserDetail label={"Grup"} value={currentUser.branch} setCurrentUser={setCurrentUser} state={'groups'} />

                </div>

            </div>
        </div>
    )
}

export default UserInfos
