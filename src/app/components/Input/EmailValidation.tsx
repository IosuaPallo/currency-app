import {ChangeEvent, useEffect, useState} from "react";
import useEmailValidation from "@/lib/hooks/useEmailValidation";
import {TextField} from "@mui/material";

type EmailValidationProps = {
    onEmailChange: (email: string) => void;
}

const EmailValidation = (props: EmailValidationProps) => {

    const {onEmailChange} = props;

    const [email, setEmail] = useState("")
    const emailError = useEmailValidation({email});

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    }

    useEffect(() => {
        onEmailChange(email);
    }, [email, emailError, onEmailChange]);

    return <>
        <TextField
            required
            error={emailError}
            label={"E-Mailadresse"}
            value={email}
            placeholder={"Ihre E-Mailadresse"}
            name={"email"}
            onChange={(e) => handleEmailChange(e)}
            sx={{width: '100%', margin: '15px 0 15px 0'}}
        />
    </>
}

export default EmailValidation;