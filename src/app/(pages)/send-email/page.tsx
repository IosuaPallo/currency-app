"use client"
import {useRouter} from "next/navigation";
import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import useEmailValidation from "@/lib/hooks/useEmailValidation";

const SendEmailPage = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const emailError = useEmailValidation({email});


    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    }

    return <>
        <Box sx={{direction: 'column'}}>
            <h1>Send Email page</h1>
            <TextField
                required
                error={emailError}
                label={"E-Mailadresse"}
                defaultValue={email}
                value={email}
                name={"email"}
                onChange={(e) => handleEmailChange(e)}

            />
            <Button variant={"contained"} disabled={email === "" || emailError}
                    onClick={() => router.push("/done")}>Next page</Button>
        </Box>
    </>
}

export default SendEmailPage;
