"use client"
import {Box, Button, Divider, Grid, TextField, Typography, useMediaQuery} from "@mui/material";
import {useRouter} from "next/navigation";
import {ChangeEvent, useState} from "react";
import {AccountCircle, ArrowBackIos, CreditCard} from "@mui/icons-material";
import useEmailValidation from "@/lib/hooks/useEmailValidation";
import useCreditNumberValidation from "@/lib/hooks/useCreditNumberValidation";
import EmailValidation from "@/app/components/Input/EmailValidation";
import useCvvValidation from "@/lib/hooks/useCvvValidation";
import NameInput from "@/app/components/Input/NameInput";
import CvvValidation from "@/app/components/Input/CvvValidation";
import CreditNumberValidation from "@/app/components/Input/CreditNumberValidation";

const CardInfoPage = () => {
    const router = useRouter();
    const matchesMD = useMediaQuery("(min-width:900px)")


    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [creditNumber, setCreditNumber] = useState('');
    const [cvv, setCvv] = useState("");
    const [expireDate, setExpireDate] = useState("");


    const emailError = useEmailValidation({email});
    const creditNumberError = useCreditNumberValidation({creditNumber})
    const cvvError = useCvvValidation(({cvv}))

    const [expireDateError, setExpireDateError] = useState(false);


    const buttonDisabled = name.length === 0 || email.length === 0 || creditNumber.length === 0 || cvv.length === 0 || expireDate.length === 0 || emailError || creditNumberError || cvvError || expireDateError;


    const handleEmailChange = (email: string) => {
        setEmail(email);
    }

    const handleCreditNumberChange = (creditNumber: string) => {
        setCreditNumber(creditNumber);
    }

    const handleExpireDateChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.value.length == 0 || e.target.value.length < 6 && ((e.target.value[e.target.value.length - 1] >= '0' && e.target.value[e.target.value.length - 1] <= '9') || (e.target.value[e.target.value.length - 1] === '/'))) {
            const rawNumbers = (e.target.value).split('/').join('');
            const expireDateArray: string[] = []
            for (let i = 0; i < rawNumbers.length; i++) {
                if (i % 2 === 0 && i !== 0) expireDateArray.push('/');
                expireDateArray.push(rawNumbers[i]);
            }
            setExpireDate(expireDateArray.join(''));
            expireDateValidation(expireDateArray.join(''));
        }
    }

    const handleCvvChange = (cvv: string) => {
        setCvv(cvv);
    }


    const expireDateValidation = (expireDate: string) => {
        const regEx = /^(0[1-9]|1[0-2])\/([0-9]{2})$/g;
        if (regEx.test(expireDate)) {
            const elements = expireDate.split("/").map(Number)
            elements[1] = 2000 + elements[1];

            const currentDate = new Date()
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1;
            if (elements[1] < currentYear) {
                setExpireDateError(true)

            } else if ((elements[1] == currentYear) && (elements[0] < currentMonth)) {
                setExpireDateError(true)
            } else {
                setExpireDateError(false)
            }
        } else {
            setExpireDateError(true)
        }
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
                width: matchesMD ? '60%' : "95%",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
            }}>
                {matchesMD &&
                    <h1> Guthaben aufladen</h1>
                }
            </Box>
            <Box sx={{
                width: matchesMD ? '60%' : "100%",
                display: 'flex',
                flexDirection: matchesMD ? 'row' : 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
            }}>
                <Box sx={{
                    width: matchesMD ? '48%' : '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    margin: '20px 0 20px 0'
                }}>
                    {
                        matchesMD ? (<Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>

                            <AccountCircle sx={{fontSize: '30px', marginRight: '5px'}}/>
                            <Typography sx={{fontWeight: '600'}}> KontaktInformation</Typography>

                        </Box>) : (<Typography sx={{fontWeight: '600'}}> Daten</Typography>)
                    }
                    {matchesMD ? (<Box>
                        <NameInput onNameChange={setName}/>
                        <EmailValidation onEmailChange={handleEmailChange}/>
                    </Box>) : (<Box>
                        <EmailValidation onEmailChange={handleEmailChange}/>
                        <NameInput onNameChange={setName}/>
                    </Box>)}


                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: matchesMD ? '48%' : '90%',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                    {
                        matchesMD ? (<Box sx={{
                            display: 'flex',
                            flexDirection: matchesMD ? 'row' : 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <CreditCard sx={{fontSize: '30px', marginRight: '5px'}}/>
                            <Typography sx={{fontWeight: '600'}}> KartenInformationen</Typography>
                        </Box>) : (<></>)
                    }


                    <CreditNumberValidation onCreditNumberChange={handleCreditNumberChange}/>

                    <Grid container justifyContent={"space-between"}
                          sx={{margin: '15px 0 15px 0'}}>
                        <CvvValidation onCvvChange={handleCvvChange}/>

                        <TextField
                            required
                            error={expireDateError}
                            label={"Ablaufdatum"}
                            value={expireDate}
                            placeholder={"MM/YY"}
                            name={"expireDate"}
                            onChange={(e) => handleExpireDateChange(e)}
                            sx={{width: '45%'}}
                        />
                    </Grid>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: matchesMD ? 'flex-end' : 'center',
                width: matchesMD ? '60%' : '90%',
                margin: '15px 0 15px 0'
            }}>
                <Divider sx={{width: matchesMD ? '48%' : '100%'}}/>
            </Box>

            <Button sx={{margin: '30px 0 0 0', width: matchesMD ? '300px' : '90%', height: '50px'}}
                    variant={"contained"}
                    disabled={buttonDisabled}
                    onClick={() => router.push("/done/success")}>Zahlungspflichtig bestellen</Button>
            <Button sx={{margin: '20px 0 0 0', width: '250px'}}
                    onClick={() => router.push("/choose")}><ArrowBackIos/> Zuruck</Button>
        </Box>
    </>
}

export default CardInfoPage