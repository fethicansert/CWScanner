import React, { useMemo } from 'react'
import { v4 as uuid } from 'uuid';
import { PiCircleDashedFill } from "react-icons/pi";

const TableItem = ({ item, setCurrentItem }) => {

    const style = {
        background: item.isActive ? 'rgb(230,230,230)' : 'white'
    }

    const cells = useMemo(() => {
        const cellArr = [];
        for (const cellData in item) {


            if (
                cellData !== 'front_image' &&
                cellData !== 'back_image' &&
                cellData !== 'isActive' &&
                cellData !== 'user_permissions' &&
                cellData !== 'id' &&
                cellData !== 'password' &&
                cellData !== "scan_date" &&
                cellData !== "customer_id" &&
                cellData !== "check_id") {


                if (typeof item[cellData] === 'object') {

                    if (item[cellData]?.length > 0) {

                        cellArr.push(<td key={uuid()}>{item[cellData][0].name}</td>)

                    } else {

                        cellArr.push(<td key={uuid()}></td>)

                    }

                } else {
                    if (cellData === 'check_status') {
                        cellArr.push(<td key={uuid()} style={{ textAlign: 'center' }}>
                            <PiCircleDashedFill color={item[cellData] == 300 ? 'orange' : item[cellData] == 200 ? 'green' : 'red'} />
                        </td>)
                    } else
                        cellArr.push(<td key={uuid()}>
                            {item[cellData]}
                        </td>)
                }
            }
        }

        return cellArr

    }, [item])

    return <tr style={style} className='check-row' onClick={() => setCurrentItem(item)}>{cells}</tr>
}

export default TableItem
