import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Processing(props) {

    return <div className="tabulation-linear-progress-bar">
        <div className="tabulation-linear-progress-bar-label">Loading ... </div>
        <LinearProgress/>
    </div>
}

