import React, { useState, useEffect } from 'react';
import { MdOutlineManageSearch } from "react-icons/md";
import { HiMiniBarsArrowDown } from "react-icons/hi2";

const UsersFilter = ({ search, setSearch, searchOption, setSearchOption }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showSearch, setShowSearch] = useState(true);


    const getPlaceholder = () => {
        switch (searchOption) {//hangi butona basarsa 
            case 'Çek Sahibi':
                return 'Çek Sahibi Giriniz';
            case 'Hesap Numarası':
                return 'Hesap Numarası Giriniz';
            case 'Banka Adı':
                return 'Banka Adı Giriniz';
            case 'Şube Adı':
                return 'Şube Adı Giriniz';
            case 'Alacaklı':
                return 'Alacaklı Giriniz';
            default:
                return 'Arama yapınız'; //default olarak arama yapınız çıkar 
        }
    };

    return (
        <div className="user-list-user-search-filter-bar">
            <div className="user-list-search-flex">
                <input
                    type="text"
                    placeholder={getPlaceholder()}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="search-button"
                    onClick={() => setShowDropDown(!showDropDown)}
                    onMouseEnter={() => setShowSearch(false)}
                    onMouseLeave={() => setShowSearch(true)}>
                    {showSearch
                        ? <MdOutlineManageSearch size={24} />
                        : <HiMiniBarsArrowDown size={24} />
                    }
                    {showDropDown && <div className='search-button-drop-down'>
                        <button onClick={(e) => setSearchOption(e.target.innerText)}>Çek Sahibi</button>
                        <button onClick={(e) => setSearchOption(e.target.innerText)}>Hesap Numarası</button>
                        <button onClick={(e) => setSearchOption(e.target.innerText)}>Banka Adı</button>
                        <button onClick={(e) => setSearchOption(e.target.innerText)}>Şube Adı</button>
                        <button onClick={(e) => setSearchOption(e.target.innerText)}>Alacaklı</button>
                    </div>}
                </button>
            </div>
            <div className="user-list-search-buttons-flex">
                <button className="sort-button">Sırala</button>
                <button className="filter-button">Filtrele</button>
            </div>
        </div>
    );
};

export default UsersFilter;