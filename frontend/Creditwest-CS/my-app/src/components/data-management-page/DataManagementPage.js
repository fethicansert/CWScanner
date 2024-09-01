import React, { useState } from "react";
import '../../css/data-management-page.css';
import fakeCheckData from '../../data/checkdata';
import UsersFilter from "../data-management-page/UsersFilter";

const DataManagementPage = () => {
    const [data, setData] = useState(fakeCheckData); // fake data gullandık gene
    const [search, setSearch] = useState('');
    const [searchOption, setSearchOption] = useState('Arama'); // en baştaki search psiyonu

    // Filter data based on search input and selected option
    const filteredData = data.filter(item => {
        switch (searchOption) {
            case 'Check Owner':
                return item.checkOwner.toLowerCase().includes(search.toLowerCase());
            case 'Account Number':
                return item.accountNumber.toString().includes(search);
            case 'Bank Name':
                return item.bankName.toLowerCase().includes(search.toLowerCase());
            case 'Branch Name':
                return item.branchName.toLowerCase().includes(search.toLowerCase());
            case 'Payee Name':
                return item.payeeName.toLowerCase().includes(search.toLowerCase());
            default:
                return true;
        }
    });

    return (
        <main className="data-management-page">
            <div className="data-management-container">
                <h3 className="data-management-title">Veri Yönetimi</h3>
                <UsersFilter
                    search={search}
                    setSearch={setSearch}
                    searchOption={searchOption}
                    setSearchOption={setSearchOption}
                />
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Çek Numarası</th>
                            <th>Çek Sahibi</th>
                            <th>Hesap Numarası</th>
                            <th>Banka Adı</th>
                            <th>Şube Adı</th>
                            <th>Bölge</th>
                            <th>Alacaklı</th>
                            <th>Çek Tarihi</th>
                            <th>Çek Miktarı</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0
                            ? filteredData.map(item => (
                                <tr key={item.checkNumber}>
                                    <td>{item.checkNumber}</td>
                                    <td>{item.checkOwner}</td>
                                    <td>{item.accountNumber}</td>
                                    <td>{item.bankName}</td>
                                    <td>{item.branchName}</td>
                                    <td>{item.regionName}</td>
                                    <td>{item.payeeName}</td>
                                    <td>{item.checkDate}</td>
                                    <td> {item.checkAmount} {item.checkCurrency}</td>
                                </tr>
                            ))
                            : <tr><td colSpan="9">Veri bulunmamakta</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default DataManagementPage;