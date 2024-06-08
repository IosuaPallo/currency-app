import {useEffect, useState} from "react";

type UseCreditNumberValidationProps = {
    creditNumber: string;
}

const useCreditNumberValidation = (props: UseCreditNumberValidationProps) => {
    const {creditNumber} = props;

    const [error, setError] = useState(false);

    useEffect(() => {
        const regEx = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/g;
        if (regEx.test(creditNumber)) {
            setError(false);
        } else {
            setError(true)
        }
    }, [creditNumber]);

    return error;
}

export default useCreditNumberValidation;