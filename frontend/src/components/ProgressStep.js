import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'

function ProgressStep({value}) {
    return (
               <ProgressBar>
                    <ProgressBar variant="success" animated now={value} />
               </ProgressBar>
    )
}

export default ProgressStep

