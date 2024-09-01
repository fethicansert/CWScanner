import React, { useEffect, useRef, useState } from "react";
import ScannerDetails from "./scannerdetails/ScannerDetail";
import CheckDetails from "./checkdetails/CheckDetails";
import CheckImage from "./checkImage/CheckImage";
import ScannedChecks from "./scanned-checks/ScannedChecks";
import placeHolderImage from '../../images/Filling-Out-A-Check-Date.webp';
import CheckView from "./checkImage/CheckView";
import { v4 as uuid } from 'uuid';
import Overlay from "./checkImage/Overlay";
import { Oval } from 'react-loader-spinner';


import useAuth from "../../hooks.js/useAuth";

const CheckScanPage = () => {

    const { auth } = useAuth();

    const checkSequnceReverse = useRef(false);

    //Tablo daki indexi tutabilmek currentIndex degeri
    const [currentIndex, setCurrentIndex] = useState(0)

    //CheckView in gosterilip gosterilmeyecegini belirten state
    const [isCheckView, setIsCheckView] = useState(false);

    //Okunma- yuklenme isleminin tamamlanip tamamlandigi belirten state
    const [isLoading, setIsLoading] = useState(false);

    const [isUpdateLoading, setUpdateIsLoading] = useState(false);

    //okunmus cekler
    const [scannedChecks, setScannedChecks] = useState([]);

    //cek sırası
    const [checkSequnce, setCheckSqeunce] = useState(0);

    const [isFrontImage, setIsFrontImage] = useState(true)

    //Ilk default cek icin data
    const [currentCheck, setCurrentCheck] = useState({
        id: '',
        checkSequnce: 0,
        check_number: '',
        check_owner: '',
        check_status: '',
        amount: '',
        account_number: '',
        bank_number: '',
        branchName: '',
        regionName: '',
        payee_name: '',
        date: '',
        currency: '',
        front_image: placeHolderImage,
        back_image: placeHolderImage,
        isActive: false,
    });

    console.log(currentCheck);


    useEffect(() => {
        const getChecks = async () => {
            const response = await fetch('http://127.0.0.1:8000/checks/');

            if (response.ok) {

                const data = await response.json();
                console.log(data);

                if (data.length > 0) {

                    let checkSequenceCount = 0;
                    const updatedChecks = data.map(check => {
                        checkSequenceCount = checkSequenceCount + 1
                        return {
                            checkSequnce: checkSequenceCount,
                            check_owner: check.check_owner,
                            account_number: check.account_number,
                            check_number: check.check_number,
                            amount: check.amount,
                            bank_number: check.bank_number,
                            payee_name: check.payee_name,
                            currency: check.currency,
                            ...check,
                            isActive: false,
                        }
                    })

                    setScannedChecks(updatedChecks)
                    setCurrentCheck({ ...updatedChecks[0], isActive: true })
                }
            }
        }
        getChecks();
    }, [])

    ///currentCheck her degistiginde currentIndex de degisecek
    useEffect(() => {
        let currentindex;
        scannedChecks.forEach((item, index) => {
            if (item.checkSequnce === currentCheck.checkSequnce) {
                currentindex = index;
            }
        });
        setCurrentIndex(currentindex);
    }, [currentCheck, scannedChecks])

    //currentcheck her degistiginde currentcheck isActive(seçilmiş çek) true geri kalanlar false olacak
    useEffect(() => {

        const updatedChecks = scannedChecks.map(check => {
            if (check.checkSequnce === currentCheck.checkSequnce) {
                check.isActive = true
            } else {
                check.isActive = false
            }
            return check;
        });

        setScannedChecks(updatedChecks);

    }, [currentCheck]);

    //cekin ekranin ortasinda buyuk bir sekilde gozukmesi
    const showCheckView = () => {
        setIsCheckView(!isCheckView);
    }

    //Cek okunma taklidi yap
    const checkScan = async () => {

        setIsLoading(true);

        const setChecks = async () => {

            const response = await fetch('http://127.0.0.1:8000/checks/');
            const data = await response.json()
            let checkSequenceCount = 0;
            const updatedChecks = data.map(check => {
                checkSequenceCount = checkSequenceCount + 1
                return {
                    checkSequnce: checkSequenceCount,
                    check_owner: check.check_owner,
                    account_number: check.account_number,
                    check_number: check.check_number,
                    amount: check.amount,
                    bank_number: check.bank_number,
                    payee_name: check.payee_name,
                    currency: check.currency,
                    ...check,
                    isActive: false,
                }
            })

            console.log(updatedChecks);

            setScannedChecks(updatedChecks)
            setCurrentCheck({ ...updatedChecks[updatedChecks.length - 1], isActive: true })
        }


        const requestBody = {
            scan_status: 300,
            scan_status_message: "Waiting"
        }

        const options = {
            method: "POST",
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(requestBody)
        }

        try {
            const scanStatusResponse = await fetch("http://127.0.0.1:8000/scan_status/", options)
            const scan_status_data = await scanStatusResponse.json()


            const response = fetch(`http://127.0.0.1:8000/scan/ConsoleCheckScannerExample.application?param1=${scan_status_data.data.id}`)
                .then(response => console.log(response))
                .catch(e => console.log(e))


            const scanStatusInterval = setInterval(async () => {
                const scanStatusResponse = await fetch(`http://127.0.0.1:8000/scan_status/${scan_status_data.data.id}`)
                const data = await scanStatusResponse.json();
                console.log(data);
                if (data.scan_status == 200) {
                    clearInterval(scanStatusInterval);
                    setIsLoading(false);
                    setChecks()
                } else if (data.scan_status == 400) {
                    console.log("Error");

                }
            }, 1500);

        } catch (e) {
            console.log(e);
        }
    };

    const deleteCheck = async (id) => {

        setUpdateIsLoading(true)
        const updateCheck = {
            amount: currentCheck.amount,
            check_status: 400,
            account_number: currentCheck.account_number,
            payee_name: currentCheck.payee_name,
            currency: currentCheck.currency,
            date: currentCheck.date
        }

        const options = {
            method: "PUT",
            headers: new Headers({
                "Authorization": `Bearer ${auth.token.access}`,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updateCheck)
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/checks/${currentCheck.id}/`, options);
            const data = await response.json()
            console.log(data);

            if (response.ok) {
                if (scannedChecks.length > 0) {
                    const updatedChecks = scannedChecks.map(check => {
                        if (check.id === id) {
                            check.check_status = 400
                            check.amount = currentCheck.amount
                            check.payee_name = currentCheck.payee_name
                            check.currency = currentCheck.currency
                            check.date = currentCheck.date
                        }
                        return check
                    })

                    setScannedChecks(updatedChecks)
                    setTimeout(() => {
                        setUpdateIsLoading(false)
                    }, 500);
                }
            }
        } catch (e) {
            console.log(e);
            setUpdateIsLoading(false)
        }

    }


    const updateCheck = async (id) => {

        setUpdateIsLoading(true)
        const updateCheck = {
            amount: currentCheck.amount,
            check_status: 200,
            account_number: currentCheck.account_number,
            payee_name: currentCheck.payee_name,
            currency: currentCheck.currency,
            date: currentCheck.date
        }

        const options = {
            method: "PUT",
            headers: new Headers({
                "Authorization": `Bearer ${auth.token.access}`,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(updateCheck)
        };

        try {
            const response = await fetch(`http://127.0.0.1:8000/checks/${currentCheck.id}/`, options);
            const data = await response.json()
            console.log(data);

            if (response.ok) {
                if (scannedChecks.length > 0) {
                    const updatedChecks = scannedChecks.map(check => {
                        if (check.id === id) {
                            check.check_status = 200
                            check.amount = currentCheck.amount
                            check.payee_name = currentCheck.payee_name
                            check.currency = currentCheck.currency
                            check.date = currentCheck.date
                        }
                        return check
                    })

                    setScannedChecks(updatedChecks)
                    setTimeout(() => {
                        setUpdateIsLoading(false)
                    }, 500);
                }
            }
        } catch (e) {
            console.log(e);
            setUpdateIsLoading(false)
        }

    }


    return (
        <div className="wrapper">
            <main className="check-scan-page">


                <div className="check-scan-page-grid-flex-box check-scan-page-grid-item">
                    {/* Cek Okunduktan sonra cek bilgilerinin bulundugu component */}
                    <ScannerDetails checkScan={checkScan} scannedCheckCount={scannedChecks.length} />

                    {/* Cek Okunduktan sonra cek bilgilerinin bulundugu component */}
                    <CheckDetails
                        id={currentCheck.id}
                        checkSequence={currentCheck.checkSequnce}
                        bankName={currentCheck.bank_number}
                        checkOwner={currentCheck.check_owner}
                        accountNumber={currentCheck.account_number}
                        checkNumber={currentCheck.check_number}
                        amount={currentCheck.amount}
                        checkDate={currentCheck.date}
                        payee_name={currentCheck.payee_name}
                        branchName={currentCheck.branchName}
                        regionName={currentCheck.regionName}
                        checkCurrency={currentCheck.currency}
                        check_status={currentCheck.check_status}
                        isLoading={isLoading}
                        setCurrentCheck={setCurrentCheck}
                        updateCheck={updateCheck}
                        deleteCheck={deleteCheck}
                    />

                </div>

                {/* Cek resminin ortalama bir boyutta gosterildigi copmonent  */}
                <CheckImage
                    isLoading={isLoading}
                    checkImage={currentCheck.front_image}
                    showCheckImage={showCheckView}
                    setCurrentCheck={setCurrentCheck}
                    scannedChecks={scannedChecks}
                    checkIndex={currentIndex}
                />

                {/* Okunmus ceklerin gosterildi tablo copmonent  */}
                <ScannedChecks
                    checkSequnceReverse={checkSequnceReverse}
                    setCurrentCheck={setCurrentCheck}
                    scannedChecks={scannedChecks}
                    setScannedChecks={setScannedChecks}
                />

                {/* Overlay copmonent  arka tarafi gölgelendirecek 
                CheckView copmonent  ceki daha buyuk boyutta ekranin ortasinda gosterecek */}
                {
                    isCheckView &&
                    <>
                        <CheckView
                            setIsFrontImage={setIsFrontImage}
                            checkImage={currentCheck.front_image?.length < 100
                                ? currentCheck.front_image
                                : `data:image/png;base64,${isFrontImage ? currentCheck.front_image : currentCheck.back_image}`} />
                        <Overlay setIsCheckView={setIsCheckView} isCheckView={isCheckView} />
                    </>
                }
                {
                    isUpdateLoading && <Oval
                        visible={true}
                        height="250"
                        width="250"
                        color="#015CA9"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass="oval-spinner"
                    />
                }
            </main>
        </div>
    );
}

export default CheckScanPage;