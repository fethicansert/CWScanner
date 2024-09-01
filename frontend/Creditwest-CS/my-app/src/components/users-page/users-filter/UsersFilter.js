import React, { useState, useEffect } from 'react';
import { MdOutlineManageSearch } from "react-icons/md";
import { HiMiniBarsArrowDown } from "react-icons/hi2";

const UsersFilter = ({ search, setSearch, searchOption, setSearchOption, handleSearch, handleSort, setFilteredUsers, users }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [showSearch, setShowSearch] = useState(true);
    const [activeButton, setActiveButton] = useState(null); // Aktif buton durumunu yönet

    useEffect(() => {
        if (search === '') {
            // Eğer arama kutusu boşsa, tüm kullanıcıları göster
            setFilteredUsers(users);
        }
    }, [search, users, setFilteredUsers]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSortClick = () => {
        setActiveButton('sort');
        handleSort();
    };

    const handleFilterClick = () => {
        setActiveButton('filter');
        handleSearch();
    };

    return (
        <div className="user-list-user-search-filter-bar">
            <div className="user-list-search-flex">
                <input
                    type="text"
                    placeholder={`${searchOption} Giriniz`}
                    value={search}
                    onChange={handleInputChange} // Arama çubuğundaki değişiklikleri izleme
                />
                <button
                    className={`search-button ${showDropDown ? 'active' : ''}`}
                    onClick={() => setShowDropDown(!showDropDown)}
                    onMouseEnter={() => setShowDropDown(true)}
                    onMouseLeave={() => setShowDropDown(false)}
                >
                    {showSearch ? <MdOutlineManageSearch size={24} /> : <HiMiniBarsArrowDown size={24} />}
                    {showDropDown && (
                        <div className="search-button-drop-down">
                            <button onClick={() => setSearchOption('Kullanıcı Adı')}>Kullanıcı Adı</button>
                            <button onClick={() => setSearchOption('Kimlik Numarası')}>Kimlik Numarası</button>
                            <button onClick={() => setSearchOption('Email')}>Email</button>
                            <button onClick={() => setSearchOption('Telefon Numarası')}>Telefon Numarası</button>
                        </div>
                    )}
                </button>
            </div>

            <div className="user-list-search-buttons-flex">
                <button className={`sort-button ${activeButton === 'sort' ? 'active' : ''}`} onClick={handleSort}>Sırala</button>
                <button className={`filter-button ${activeButton === 'filter' ? 'active' : ''}`} onClick={handleFilterClick}>Filtrele</button>
            </div>
        </div>
    );
};

export default UsersFilter;
