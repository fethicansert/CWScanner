import React from 'react'

const Overlay = ({ setIsCheckView, isCheckView }) => {

    const style = {
        animation: "appear 500ms ease"
    }

    return (
        <div className={'overlay'} style={style} onClick={() => setIsCheckView(false)}>

        </div>
    )
}

export default Overlay
