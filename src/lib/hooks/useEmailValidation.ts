import {useEffect, useState} from "react";

type UseEmailValidationProps = {
    email: string;
}

const useEmailValidation = (props: UseEmailValidationProps) => {
    const {email} = props;

    const [emailError, setEmailError] = useState<boolean>(false);


    useEffect(() => {
        const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9+-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (email.length <= 2) {
            setEmailError(true);
        } else if (!regEx.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }, [email]);


    return emailError;
}

export default useEmailValidation;
