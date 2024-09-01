import React, { useState, useEffect } from "react";
import '../../css/customer-page.css';
import InputComponent from "../form-components/InputComponent";
import SelectOptionscus from "../form-components/Selectoptionscustomer";
import Popup from "../form-components/Popup";

const AddCustomerPage = () => {
    const [formData, setFormData] = useState({
        customerIDCardNo: '',
        customerFirstName: '',
        customerLastName: '',
        customerAccountNumber: '',
        customerType: 1,
        customerAddress: '',
        customerEmail: '',
        customerPhoneNumber: '',
        customerBankBranch: '',
        customerid: '',
    });

    const [branches, setBranches] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popUpMessage, setPopupMessage] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const branchResponse = await fetch('http://127.0.0.1:8000/branch/');
                if (!branchResponse.ok) throw new Error('Failed to get branches');
                const branchData = await branchResponse.json();
                console.log('Branches:', branchData);
                setBranches(branchData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;


        if (name === 'customerBankBranch') {
            setFormData({
                ...formData,
                [name]: parseInt(value, 10)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            customer_id: formData.customerid,
            customer_name: formData.customerFirstName,
            customer_lastname: formData.customerLastName,
            id_number: formData.customerIDCardNo,
            check_number: formData.customerAccountNumber,
            account_number: formData.customerAccountNumber,
            customer_type: formData.customerType,
            address: formData.customerAddress,
            phone: formData.customerPhoneNumber,
            mail: formData.customerEmail,
            branch_id: formData.customerBankBranch,
        };
        console.log('Request Body:', requestBody);
        const options = {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(requestBody)
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/customer/post/', options);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setPopupMessage('Müşteri başarılı bir şekilde eklendi!');
                setShowPopup(true);
                handleClear()
            } else {
                setPopupMessage(data.errors.join());
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setPopupMessage('Beklenmedik bir sorun oluştu!!!');
            setShowPopup(true);
        }
    };

    const handleClear = () => {
        setFormData({
            customerIDCardNo: '',
            customerFirstName: '',
            customerLastName: '',
            customerAccountNumber: '',
            customerType: 1,
            customerAddress: '',
            customerEmail: '',
            customerPhoneNumber: '',
            customerBankBranch: '',
            customerid: '',
        });
    };

    return (
        <main className="customer-register-page">
            <div className="customer-register-container">
                <form className="customer-register-form" onSubmit={handleSubmit}>
                    <h3 className="customer-register-title">MÜŞTERİ EKLE</h3>

                    <div className="row">
                        <div className="column">
                            <InputComponent
                                label="İsim"
                                type="text"
                                id="customerFirstName"
                                name="customerFirstName"
                                value={formData.customerFirstName}
                                onChange={handleChange}
                                placeholder="Müşteri Adı"
                            />
                            <InputComponent
                                label="Müşteri Hesap Numarası"
                                type="tel"
                                id="customerAccountNumber"
                                name="customerAccountNumber"
                                value={formData.customerAccountNumber}
                                onChange={handleChange}
                                placeholder="Müşteri Hesap Numarası"
                            />
                            <InputComponent
                                label="Müşteri Telefon Numarası"
                                type="tel"
                                id="customerPhoneNumber"
                                name="customerPhoneNumber"
                                value={formData.customerPhoneNumber}
                                onChange={handleChange}
                                placeholder="+90(5)___ ___ __ __"
                            />
                            <InputComponent
                                label="Müşteri Adresi"
                                type="text"
                                id="customerAddress"
                                name="customerAddress"
                                value={formData.customerAddress}
                                onChange={handleChange}
                                placeholder="Küçükkaymaklı/Lefkoşa..."
                            />
                            <InputComponent
                                label="Kullanıcı Numarası"
                                type="tel"
                                id="customerid"
                                name="customerid"
                                value={formData.customerid}
                                onChange={handleChange}
                                placeholder="123"
                            />
                        </div>

                        <div className="column">
                            <InputComponent
                                label="Soyisim"
                                type="text"
                                id="customerLastName"
                                name="customerLastName"
                                value={formData.customerLastName}
                                onChange={handleChange}
                                placeholder="Müşteri Soyadı"
                            />
                            <InputComponent
                                label="Müşteri Kimlik Numarası"
                                type="tel"
                                id="customerIDCardNo"
                                name="customerIDCardNo"
                                value={formData.customerIDCardNo}
                                onChange={handleChange}
                                placeholder="1234567890"
                            />
                            <InputComponent
                                label="Müşteri Emaili"
                                type="email"
                                id="customerEmail"
                                name="customerEmail"
                                value={formData.customerEmail}
                                onChange={handleChange}
                                placeholder="example@gmail.com"
                            />
                            <SelectOptionscus
                                name="customerBankBranch"
                                onChange={handleChange}
                                label="Şube"
                                options={Array.isArray(branches) ? branches : []}
                                placeholder="Lütfen şube seçiniz"
                                value={formData.customerBankBranch}
                            />
                            <div className="buttons-flex">
                                <button type="submit" className="customer-register-button">EKLE</button>
                                <button type="button" className="customer-clear-button" onClick={handleClear}>TEMİZLE</button>
                            </div>
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

export default AddCustomerPage;