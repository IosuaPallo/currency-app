"use client"
import {Box, Button, Divider, TextField, Typography, useMediaQuery} from "@mui/material";
import {useRouter} from "next/navigation";
import usePhoneNumberValidation from "@/lib/hooks/usePhoneNumberValidation";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import SumRadioGroup from "@/app/components/SumRadioGroup";
import PaymentMethods from "@/app/components/PaymentMethods";
import {useInfoContext} from "@/lib/context/InfoContext";

const ChoosePage = () => {
    const router = useRouter();
    const matchesMD = useMediaQuery("(min-width:900px)")
    const infoContext = useInfoContext();


    const boxRef = useRef(null);
    const [boxWidth, setBoxWidth] = useState(0);


    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');

    const phoneNumberError = usePhoneNumberValidation({phoneNumber});

    const buttonDisabled = phoneNumber === '' || amount === 0 || paymentMethod === '' || phoneNumberError

    const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if ((e.target.value.length == 0 || /\d$/.test(e.target.value)) && e.target.value.length < 14) {
            setPhoneNumber(e.target.value)
        }
    }

    const handleAmountChange = (value: number) => {
        setAmount(value);
    }

    const handlePaymentMethod = (method: string) => {
        setPaymentMethod(method);
    }

    const handleGoToNextPage = () => {
        console.log("Am ajuns")
        infoContext.setAmount(amount);
        infoContext.setPhoneNumber(phoneNumber);
        router.push(paymentMethod === 'giropay' ? "/giropay" : "/card-info");
    }


    useEffect(() => {
        const handleResize = () => {
            if (boxRef.current !== null) {
                const width = boxRef.current.clientWidth;
                setBoxWidth(width);
            }
        };

        // Attach event listener
        window.addEventListener('resize', handleResize);

        // Initial width
        handleResize();

        // Detach event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [boxRef]); // Run effect only once on mount

    return <>
        <Box
            sx={{
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
            {!matchesMD &&
                <Box sx={{
                    width: '100%',
                    background: "#1565c0",
                    height: '70px',
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Typography sx={{fontWeight: '600', color: 'white', fontSize: '25px'}}>Guthaben
                        aufladen</Typography>
                </Box>
            }
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: matchesMD ? '60%' : "100%",
                alignText: 'start',
            }}>
                {matchesMD && <h2>Guthaben aufladen</h2>}
                <Typography sx={{fontWeight: '600', fontSize: '18px', marginTop: '10px'}}>Direkt online
                    aufladen</Typography>
                <Typography sx={{fontWeight: '300', fontSize: '15px'}}>Der gewahlte Aufladebetrag steht direkt zur
                    Verfungung</Typography>
            </Box>
            <Box ref={boxRef}
                 sx={{
                     display: 'flex',
                     flexDirection: matchesMD ? 'row' : 'column',
                     justifyContent: 'flex-end',
                     alignItems: 'flex-end',
                     width: matchesMD ? '60%' : '90%',
                     margin: '20px 0 20px 0 ',
                 }}>
                <TextField
                    required
                    error={phoneNumberError}
                    label="Aufzuladende Rufnummer"
                    defaultValue={phoneNumber}
                    value={phoneNumber}
                    placeholder={"0176123456789"}
                    name="phoneNumber"
                    onChange={(e) => handlePhoneNumberChange(e)}
                    sx={{width: matchesMD ? '90%' : '100%', margin: matchesMD ? '0' : '20px 0 20px 0'}}
                    InputProps={{
                        sx: {height: '50px'},
                    }}
                />
                <SumRadioGroup onValueChange={handleAmountChange} boxWidth={boxWidth / 2}/>
            </Box>
            <Divider sx={{width: matchesMD ? '60%' : '90%', margin: '20px 0 20px 0'}}/>
            <PaymentMethods onPaymentMethodChange={handlePaymentMethod} boxWidth={boxWidth}/>
            <Button sx={{margin: '20px 0 0 0', width: '300px'}} variant={"contained"} disabled={buttonDisabled}
                    onClick={() => {
                        handleGoToNextPage()
                    }}>
                Zahlungspflichtig bestellen
            </Button>
        </Box>
    </>
}

export default ChoosePage;