import React, {useState} from "react";
import {getTallySheetVersionLetterHtml} from "../../services/tabulation-api";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function PrintLetterButton(props) {

    const {tallySheetId, tallySheetVersionId, children} = props;
    const [printJobs, setPrintJobs] = useState([]);

    const onHtmlContentIsReady = (printJob) => (event) => {
        printJob.ref.current.contentWindow.print();
    };

    const onPrintClick = () => (event) => {
        getTallySheetVersionLetterHtml(tallySheetId, tallySheetVersionId).then((srcDoc) => {
            setPrintJobs((printJobs) => {

                const printJob = {
                    srcDoc: srcDoc,
                    onLoad: (event) => {
                        onHtmlContentIsReady(printJob)(event)
                    },
                    ref: React.createRef()
                };

                return [
                    ...printJobs,
                    printJob
                ]
            });

            props.onClick(event);
        });
    };

    return <Button
        variant={props.variant}
        color={props.color}
        size={props.size}
        disabled={props.disabled}
        onClick={onPrintClick()}
    >
        {printJobs.map((printJob) => {
            return <iframe
                style={{display: 'none'}}
                srcDoc={printJob.srcDoc}
                onLoad={printJob.onLoad}
                ref={printJob.ref}
            />
        })}

        {children}
    </Button>
}
