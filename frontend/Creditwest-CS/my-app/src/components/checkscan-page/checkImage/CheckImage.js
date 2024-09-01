import React, { useEffect, useState } from "react";
import { MagnifyingGlass } from 'react-loader-spinner';

const CheckImage = ({ checkImage, isLoading, showCheckImage, setCurrentCheck, scannedChecks, checkIndex }) => {

    const [isDisabledButtonPrevious, setDisableButtonPrevious] = useState(false);
    const [isDisabledButtonNext, setDisableButtonNext] = useState(false);


    const style = {
        opacity: isDisabledButtonPrevious ? '0.6' : '1'
    }

    const style1 = {
        opacity: isDisabledButtonNext ? '0.6' : '1'
    }

    useEffect(() => {

        if (checkIndex < 1 || scannedChecks.length === 0) {
            setDisableButtonPrevious(true);
        } else {
            setDisableButtonPrevious(false);
        }

    }, [checkIndex, scannedChecks]);

    useEffect(() => {

        if (checkIndex + 1 === scannedChecks.length || scannedChecks.length === 0) {
            setDisableButtonNext(true)
        } else {
            setDisableButtonNext(false)
        };

    }, [checkIndex, scannedChecks]);


    const previousCheck = () => {
        if (!isDisabledButtonPrevious) {
            setCurrentCheck(scannedChecks[checkIndex - 1]);
        };
    };

    const nextCheck = () => {
        if (scannedChecks.length - 1 !== checkIndex) {
            setCurrentCheck(scannedChecks[checkIndex + 1])
        }
    };


    return (
        <div className="check-image-container">

            <h3 className="container-sub-title">Çek Resmi</h3>

            {
                !isLoading
                    ? <img className="check-image" src={checkImage?.length < 200 ? checkImage : `data:image/png;base64,${checkImage}`}></img>
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

            <div className="check-image-buttons-container">
                <button
                    style={style}
                    disabled={isDisabledButtonPrevious}
                    onClick={previousCheck}
                    className="check-scan-button">
                    Önceki Çek
                </button>

                <button
                    onClick={showCheckImage}
                    className="check-scan-button view-check-button">
                    Çeki Göster
                </button>

                <button
                    style={style1}
                    disabled={isDisabledButtonNext}
                    onClick={nextCheck}
                    className="check-scan-button">
                    Sonraki Çek
                </button>
            </div>

        </div>


    )
};

export default CheckImage;