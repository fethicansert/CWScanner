import React from 'react'

const Table = ({ children }) => {
    return (
        <div className='scanned-checks-table-wrapper'>
            <table>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>)

}

export default Table
