"use client"
import {useRouter} from "next/navigation";
import {Box, Button, Typography, useMediaQuery} from "@mui/material";
import {useState} from "react";
import useEmailValidation from "@/lib/hooks/useEmailValidation";
import {ArrowBackIos} from "@mui/icons-material";
import EmailValidation from "@/app/components/Input/EmailValidation";

const SendEmailPage = () => {
    const router = useRouter();
    const matchesMD = useMediaQuery("(min-width:900px)")


    const [email, setEmail] = useState("");
    const emailError = useEmailValidation({email});

    const buttonDisabled = email === '' || emailError;

    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    return <>
        <Box sx={{
            ...{
                display: 'flex',
                width: '100%',
                textAlign: 'center',
                flexDirection: 'column',
            },
            ...(matchesMD ? {
                justifyContent: 'center',
                alignItems: 'center',
            } : {
                justifyContent: 'flex-start',
                alignItems: 'center',
            })
        }}>

            <Box sx={{
                ...{
                    display: 'flex',
                    width: matchesMD ? '60%' : '90%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}>
                <Typography sx={{
                    fontWeight: '600',
                    fontSize: matchesMD ? '25px' : '20px',
                    margin: '20px 0 20px 0',
                    textAlign: 'start'
                }}>Bitte
                    geben Sie Ihre
                    E-Mailadresse ein, um
                    forzufahren</Typography>
                <Box sx={{width: matchesMD ? "80%" : '100%'}}>
                    <EmailValidation onEmailChange={handleEmailChange}/>
                </Box>
                <Button sx={{margin: '30px 0 0 0', width: matchesMD ? '300px' : '100%', height: '50px'}}
                        variant={"contained"}
                        disabled={buttonDisabled}
                        onClick={() => router.push("/done")}>
                    Zahlungspflichtig bestellen
                </Button>
                <Button sx={{margin: '20px 0 0 0', width: '250px'}}
                        onClick={() => router.push("/choose")}><ArrowBackIos/> Zuruck</Button>
            </Box>
        </Box>
    </>
}

export default SendEmailPage;
