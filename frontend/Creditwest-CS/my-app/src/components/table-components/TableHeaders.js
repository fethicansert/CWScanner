import React from 'react'
import { v4 as uuid } from 'uuid';

const HeadersRow = ({ headers }) => {

    const headerItems = headers.map(headerName => <th key={uuid()}>{headerName}</th>)

    return (
        <tr className={'table-header'}>
            {headerItems}
        </tr>

    )
}

export default HeadersRow
