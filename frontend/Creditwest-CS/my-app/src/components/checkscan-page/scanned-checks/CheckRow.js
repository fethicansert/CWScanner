import React, { useState } from "react";
import { v4 as uuid } from 'uuid';

const CheckRow = ({ check, setCurrentCheck }) => {


    const setSelectedRow = () => {
        setCurrentCheck(check);
    }

    const style = {
        background: check.isActive ? 'rgb(230,230,230)' : 'white'
    }

    return (
        <tr className="check-row"
            onClick={setSelectedRow}
            key={uuid()}
            style={style}>
            <td key={uuid()}>{check.checkSequnce}</td>
            <td key={uuid()}>{check.checkNumber}</td>
            <td key={uuid()}>{check.checkOwner}</td>
            <td key={uuid()}>{check.accountNumber}</td>
            <td key={uuid()}>{check.bankName}</td>
            <td key={uuid()}>{check.branchName}</td>
            <td key={uuid()}>{check.regionName}</td>
            <td key={uuid()}>{check.payeeName}</td>
            <td key={uuid()}>{check.checkDate}</td>
            <td key={uuid()}>{check.checkCurrency}</td>
            <td key={uuid()}>{check.checkAmount}</td>
        </tr>
    );
}

export default CheckRow;