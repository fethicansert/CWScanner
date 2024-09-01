import React from "react";



const ScannerDetails = ({ checkScan, scannedCheckCount }) => {
    return (
        <div className="scanner-details-container">

            <div className="scanner-details-flex">
                <h3 className="container-sub-title">Çek Okuyucu Bilgileri</h3>

                {/* <a href="http://127.0.0.1:8000/scan/ConsoleCheckScannerExample.application" className="check-scan-button-link"> */}
                <button onClick={checkScan} className="check-scan-button">
                    Çek Oku
                </button>
                {/* </a> */}



            </div>


            <div className="scanner-details-flex">
                <label className="check-detail-label">Çek Okuyucu Durumu: <span className="check-status-text">Hazır</span></label>
                <label className="check-detail-label">Çek Okuyucu Türü: <span className="check-scanner-type-text">DCC-TS240</span></label>
                <label className="check-detail-label">Okunan Çek Sayısı: <span className="check-scanner-type-text">{scannedCheckCount}</span></label>
            </div>

        </div>
    )
};

export default ScannerDetails;