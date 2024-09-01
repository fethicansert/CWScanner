import React from 'react'
import TableItem from './TableItem'
import { v4 as uuid } from 'uuid';

const TableItems = ({ items, setCurrentItem }) => {

    const tableItems = items.map(item => <TableItem key={uuid()} item={item} setCurrentItem={setCurrentItem} />)

    return tableItems
}

export default TableItems
