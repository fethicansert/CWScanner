import React from "react";
import { MagnifyingGlass } from 'react-loader-spinner';
import CheckDetail from "./CheckDetail";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";

const CheckDetails = (
    {
        id,
        checkSequence,
        bankName,
        checkOwner,
        accountNumber,
        checkNumber,
        amount,
        isLoading,
        setCurrentCheck,
        checkCurrency,
        checkDate,
        payee_name,
        regionName,
        updateCheck,
        check_status,
        deleteCheck
    }

) => {

    console.log(check_status);

    return (
        <div className="check-details-container">
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", marginBottom: '.3rem' }}>
                <h3 style={{ margin: '0' }} className="container-sub-title">Çek Bilgileri</h3>

                <div style={{ display: "flex" }}>
                    <button onClick={() => { updateCheck(id) }} className="confirm-button" >
                        Onayla
                        <TbRosetteDiscountCheck className="confirm-button-icon" size={17} />
                    </button>
                    <button onClick={() => { deleteCheck(id) }} className="decline-button" style={{ marginLeft: "8px" }}>
                        Reddet
                        <RxCrossCircled className="decline-button-icon" size={17} />
                    </button>
                </div>

            </div>

            {!isLoading
                ? <>
                    <div className="check-detail-labels-container">
                        <div className="check-detail-labels-column">
                            <CheckDetail label={"Çek Sırası:"} disabled={true} text={checkSequence} setCurrentCheck={setCurrentCheck} state={'checkSequnce'} />
                            <CheckDetail label={"Çek Sahibi:"} text={checkOwner} setCurrentCheck={setCurrentCheck} state={'check_owner'} />
                            <CheckDetail label={"Hesap Numarası:"} text={accountNumber} setCurrentCheck={setCurrentCheck} state={'account_number'} />
                            <CheckDetail label={"Çek Numarası:"} text={checkNumber} setCurrentCheck={setCurrentCheck} state={'check_number'} />
                            <CheckDetail label={"Çek Miktarı:"} text={amount ? amount : ''} setCurrentCheck={setCurrentCheck} state={'amount'} />
                        </div>

                        <div className="check-detail-labels-column">
                            <CheckDetail label={"Banka:"} text={bankName} setCurrentCheck={setCurrentCheck} state={'bank_name'} />
                            <CheckDetail label={"Çek Durumu"} disabled={true} text={check_status === 300 ? 'BEKLEMEDE' : check_status === 200 ? 'ONAYLANDI' : 'REDDEDİLDİ'} setCurrentCheck={setCurrentCheck} state={'check_status'} />
                            <CheckDetail label={"Ödenecek Kişi:"} text={payee_name ? payee_name : ''} setCurrentCheck={setCurrentCheck} state={'payee_name'} />
                            <CheckDetail label={"Çek Tarihi:"} text={checkDate ? checkDate : ''} setCurrentCheck={setCurrentCheck} state={'date'} />
                            <CheckDetail label={"Para Birimi:"} text={checkCurrency ? checkCurrency : ''} setCurrentCheck={setCurrentCheck} state={'currency'} />
                        </div>

                    </div>
                </>
                : <MagnifyingGlass
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="magnifying-glass-loading"
                    wrapperStyle={{}}
                    wrapperClass="magnifying-glass-wrapper spinner"
                    glassColor="#c0efff"
                    color="#e15b64"
                />
            }
        </div>
    )
};

export default CheckDetails;