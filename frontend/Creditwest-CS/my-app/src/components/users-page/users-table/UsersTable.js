import React, { useState } from 'react'
import TableHeaders from '../../table-components/TableHeaders'
import Table from '../../table-components/Table'
import TableItems from '../../table-components/TableItems'

const UsersTable = ({ setCurrentUser, users }) => {

    const headerNames = ['Kimlik Numarası', 'Kullanıcı Adı', 'Ad', , 'Soyad', 'Email', 'Şube Kodu', 'Telefon Numarası', "Grup"]

    return (
        <div className="user-list-table">

            <h3 className="container-sub-title">Kullanıcılar</h3>
            <Table>
                <TableHeaders headers={headerNames} className={'table-header'} />
                <TableItems items={users} setCurrentItem={setCurrentUser} />
            </Table>
        </div>
    )
}

export default UsersTable
