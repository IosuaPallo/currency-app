"use client"
import {Box, Button, Divider, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import usePhoneNumberValidation from "@/lib/hooks/usePhoneNumberValidation";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import SumRadioGroup from "@/app/components/SumRadioGroup";
import PaymentMethods from "@/app/components/PaymentMethods";

const ChoosePage = () => {
    const router = useRouter();

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
    }, []); // Run effect only once on mount


    return <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'start',
                width: '100%'
            }}>
                <h2>Guthaben aufladen</h2>
                <h3>Direkt online aufladen</h3>
                <p>Der gewahlte Aufladebetrag steht direkt zur Verfungung</p>
            </Box>
            <Box ref={boxRef}
                 sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     width: '100%',
                     alignItems: 'end',
                 }}>
                <TextField
                    required
                    error={phoneNumberError}
                    label="Rufnummer"
                    defaultValue={phoneNumber}
                    value={phoneNumber}
                    name="phoneNumber"
                    onChange={(e) => handlePhoneNumberChange(e)}
                    sx={{width: '50%'}}
                    InputProps={{
                        sx: {height: '45px'}, // Set height to 30px
                    }}
                />
                <SumRadioGroup onValueChange={handleAmountChange} boxWidth={boxWidth / 2}/>
            </Box>
            <Divider sx={{width: '100%', margin: '20px 0 20px 0'}}/>
            <PaymentMethods onPaymentMethodChange={handlePaymentMethod} boxWidth={boxWidth}/>
            <Button sx={{margin: '20px 0 0 0', width: '300px'}} variant={"contained"} disabled={buttonDisabled}
                    onClick={() => router.push("/card-info")}>Next
                page</Button>
        </Box>
    </>
}

export default ChoosePage;