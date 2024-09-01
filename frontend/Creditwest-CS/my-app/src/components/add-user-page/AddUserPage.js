import React, { useEffect, useState } from "react";
import '../../css/register-page.css';
import { v4 as uuid } from 'uuid';
import InputComponent from "../form-components/InputComponent";
import SelectOptions from "../form-components/SelectOptions";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Popup from "../form-components/Popup";

const AddUserPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        employeeid: '',
        branch: '',
        email: '',
        phoneNumber: '',
        password: '',
        groups: [1],
        user_permissions: []
    });

    console.log(formData);



    const [permissions, setPermissions] = useState([]);

    const [selectedPermissions, setSelectedPermissions] = useState([]);

    const [groups, setGroups] = useState([]);

    const [branches, setBranches] = useState([]);

    const [showPopup, setShowPopup] = useState(false);

    const [popUpMessage, setPopupMessage] = useState("");

    const clear = () => {
        setFormData({
            firstName: '',
            lastName: '',
            username: '',
            employeeid: '',
            branch: '',
            email: '',
            phoneNumber: '',
            password: '',
            groups: [1],
            user_permissions: []
        })
    }
    useEffect(() => {
        const getData = async () => {
            try {
                const permisionResponse = await fetch('http://127.0.0.1:8000/permissions/');
                const permissionData = await permisionResponse.json();
                console.log('Permissions:', permissionData);

                const groupResponse = await fetch('http://127.0.0.1:8000/groups/');
                const groupData = await groupResponse.json();
                console.log('Groups:', groupData);

                const branchResponse = await fetch('http://127.0.0.1:8000/branch/');
                const branchData = await branchResponse.json();
                console.log('Branches:', branchData);

                setPermissions(permissionData);
                setGroups(groupData);
                setBranches(branchData);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);


    useEffect(() => {
        const selectedPermisionIds = selectedPermissions.map(permission => permission.id)
        setFormData({ ...formData, user_permissions: selectedPermisionIds })
    }, [selectedPermissions])

    const selectPermission = (perId) => {
        const selectedPermission = permissions.find(per => per.id === perId);
        setSelectedPermissions(prev => [selectedPermission, ...prev]);
        setPermissions(prev => prev.filter(per => per.id !== perId));
    };

    const removePermission = (perID) => {
        const removedPermission = selectedPermissions.find(per => per.id === perID);
        setPermissions(prev => [removedPermission, ...prev]);
        setSelectedPermissions(prev => prev.filter(per => per.id !== perID));
    };

    const clearAllPermissions = () => {
        setPermissions(prev => [...prev, ...selectedPermissions]);
        setSelectedPermissions([]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: name === 'groups' ? [parseInt(value)] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            first_name: formData?.firstName[0]?.toUpperCase() + formData?.lastName.slice(1),
            last_name: formData?.lastName[0]?.toUpperCase() + formData?.lastName.slice(1),
            employee_id: formData.employeeid,
            branch_id: parseInt(formData.branch),
            phone: formData.phoneNumber,
            groups: formData.groups,
            user_permissions: formData.user_permissions
        }



        const options = {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(requestBody)
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/users/signup/', options);
            const data = await response.json()
            console.log(data);

            const errorsArr = [];
            if (response.ok) {
                setPopupMessage(`${formData.username} kullanıcı olarak eklendi !`); setShowPopup(true);
                clear()
            } else {
                for (const errors in data) {
                    data[errors].forEach(item => errorsArr.push(item));
                }
                setShowPopup(true)
                setPopupMessage(errorsArr.join('-'))
            }
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <main className="register-page">
            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h3 className="register-title">Kullanıcı Ekle</h3>
                    <div className="register-row">
                        <div className="register-column">
                            <InputComponent
                                label="İsim"
                                type="text"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder={"Personel İsmi"}
                            />
                            <InputComponent
                                label="Kullanıcı Adı"
                                type="user"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder={"Personel01"}
                            />

                            <InputComponent
                                label="Personel Emaili"
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={"example@gmail.com"}
                            />
                            <InputComponent
                                label="Şifre"
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={""}
                            />

                            <InputComponent
                                label="Kimlik Numarası"
                                type="tel"
                                id="employeeid"
                                value={formData.employeeid}
                                onChange={handleChange}
                                placeholder={"1234567890"}
                            />

                        </div>

                        <div className="register-column">

                            <InputComponent
                                label="Soyisim"
                                type="text"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder={"Personel Soyismi"}
                            />

                            <SelectOptions
                                name={'groups'}
                                onChange={handleChange}
                                label="Group"
                                options={Array.isArray(groups) ? groups : []}
                                placeholder={"Lütfen rol seçiniz"}
                            />
                            <SelectOptions
                                name={'branch'}
                                onChange={handleChange}
                                label="Şube"
                                options={Array.isArray(branches) ? branches : []}
                                placeholder={"Lütfen şube seçiniz"}
                            />
                            <InputComponent
                                label="Telefon Numarası"
                                type="tel"
                                id="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder={"+90(533)___ __ __"}
                            />

                            <button type="submit" className="register-button">EKLE</button>

                        </div>

                        <div className="register-column">

                            <div className="register-permissions-list-container">
                                <label><h2 className="available-permissions-title">Mevcut İzinler</h2></label>
                                <ul className="available-permissions-list">
                                    {permissions.length > 0
                                        ? permissions.map(per => (
                                            <li key={uuid()} onClick={() => selectPermission(per.id)}>{per.name}
                                                <FaRegArrowAltCircleDown className="available-permissions-down-arrow"></FaRegArrowAltCircleDown>
                                            </li>
                                        ))
                                        : <p>Mevcut izin bulunmamakta</p>
                                    }
                                </ul>
                            </div>

                            <div className="register-permissions-list-container">
                                <label><h2 className="selected-permissions-title">Şecilmiş İzinler</h2></label>
                                <ul className="selected-permissions-list">
                                    {selectedPermissions.length > 0
                                        ? selectedPermissions.map(per => (
                                            <li key={uuid()} onClick={() => removePermission(per.id)}>{per.name}
                                                <FaRegArrowAltCircleUp className="selected-permissions-up-arrow"></FaRegArrowAltCircleUp>
                                            </li>
                                        ))
                                        : "Seçili izin bulunmamakta"
                                    }
                                </ul>
                            </div>
                            <button type="button" className="clear-button" onClick={clearAllPermissions}>TEMIZLE</button>
                        </div>

                    </div>

                </form>
            </div>
            <Popup
                show={showPopup}
                message={popUpMessage}
                borderColor={'#015CA9'}
                setShowPopup={setShowPopup}
                isYesOrNo={false}
            />
        </main>
    );
};

export default AddUserPage;