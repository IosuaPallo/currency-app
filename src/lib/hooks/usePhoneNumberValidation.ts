import {useEffect, useState} from "react";

type UsePhoneNumberValidationProps = {
    phoneNumber: string;
}

const usePhoneNumberValidation = (props: UsePhoneNumberValidationProps) => {
    const {phoneNumber} = props;
    const [error, setError] = useState(false);

    useEffect(() => {
        const regEx = /^0[0-9]{9,13}$/g
        if (!regEx.test(phoneNumber)) {
            setError(true);
        } else {
            setError(false);
        }
    }, [phoneNumber]);

    return error;
}

export default usePhoneNumberValidation;