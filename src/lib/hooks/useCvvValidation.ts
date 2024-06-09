import {useEffect, useState} from "react";

type UseCvvValidationProps = {
    cvv: string;
}

const useCvvValidation = (props: UseCvvValidationProps) => {

    const {cvv} = props;

    const [error, setError] = useState(false);

    useEffect(() => {
        const regEx = /^\d{3}$/g;
        if (regEx.test(cvv)) {
            setError(false)
        } else {
            setError(true)
        }
    }, [cvv]);

    return error;
}

export default useCvvValidation;
