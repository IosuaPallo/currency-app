"use client"
import {
    Button,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {useRouter} from "next/navigation";
import {ChangeEvent, useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import useEmailValidation from "@/lib/hooks/useEmailValidation";
import useCreditNumberValidation from "@/lib/hooks/useCreditNumberValidation";

const CardInfoPage = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [creditNumber, setCreditNumber] = useState('');
    const [cvv, setCvv] = useState("");
    const [expireDate, setExpireDate] = useState("");


    const emailError = useEmailValidation({email});
    const creditNumberError = useCreditNumberValidation({creditNumber})
    const [cvvError, setCvvError] = useState(false);
    const [expireDateError, setExpireDateError] = useState(false);


    const [showCvv, setShowCvv] = useState(false);

    const buttonDisabled = name.length === 0 || email.length === 0 || creditNumber.length === 0 || cvv.length === 0 || expireDate.length === 0 || emailError || creditNumberError || cvvError || expireDateError;

    const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);

    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.target.value);
    }

    const handleCreditNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length == 0 || e.target.value.length < 20 && ((e.target.value[e.target.value.length - 1] >= '0' && e.target.value[e.target.value.length - 1] <= '9') || (e.target.value[e.target.value.length - 1] === ' '))) {
            const rawNumbers = (e.target.value).split(' ').join('');
            const creditCard: string[] = []
            for (let i = 0; i < rawNumbers.length; i++) {
                if (i % 4 === 0 && i !== 0) creditCard.push(' ');
                creditCard.push(rawNumbers[i]);
            }
            setCreditNumber(creditCard.join(''));
        }
    }

    const handleCvvChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length == 0 || e.target.value.length < 4 && ((e.target.value[e.target.value.length - 1] >= '0' && e.target.value[e.target.value.length - 1] <= '9'))) {
            setCvv(e.target.value);
            cvvValidation(e.target.value);
        }
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

    const cvvValidation = (cvv: string) => {
        const regEx = /^\d{3}$/g;
        if (regEx.test(cvv)) {
            setCvvError(false)
        } else {
            setCvvError(true)
        }
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
                return;
            }
            if ((elements[1] == currentYear) && (elements[0] < currentMonth)) {
                setExpireDateError(true)
                return;
            }
            setCvvError(false)
        } else {
            setCvvError(true)
        }
    }


    return <>
        <Grid container justifyContent={'center'} alignItems={"center"} direction={"row"} sx={{width: '60%'}}>
            <Grid item xs={12} justifyContent={"start"}>
                <h1> Card Info page</h1>
            </Grid>
            <Grid item xs={6} container direction={"column"} alignItems={"start"}>
                <Typography>KontaktInformation</Typography>
                <TextField
                    required
                    label={"Name"}
                    defaultValue={name}
                    name={"name"}
                    onChange={(e) => handleNameChange(e)}
                />
                <TextField
                    required
                    error={emailError}
                    label={"E-Mailadresse"}
                    defaultValue={email}
                    value={email}
                    name={"email"}
                    onChange={(e) => handleEmailChange(e)}
                />
            </Grid>
            <Grid item xs={6} container direction={"column"} alignItems={"start"}>
                <Typography>KartenInformationen</Typography>
                <TextField
                    required
                    error={creditNumberError}
                    label={"Kreditkartennummer"}
                    defaultValue={creditNumber}
                    value={creditNumber}
                    name={"email"}
                    onChange={(e) => handleCreditNumberChange(e)}
                />

                <Grid container justifyContent={"space-between"}>
                    <FormControl sx={{width: '40%'}} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-cvv">Sicherheitscode</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-cvv"
                            type={showCvv ? 'text' : 'password'}
                            onChange={(e) => handleCvvChange(e)}
                            required
                            error={cvvError}
                            label="Sicherheitscode"
                            defaultValue={cvv}
                            value={cvv}
                            name={"cvv"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowCvv(!showCvv)}
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                    >
                                        {showCvv ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <TextField
                        required
                        error={cvvError}
                        label={"Ablaufdatum"}
                        defaultValue={expireDate}
                        value={expireDate}
                        name={"expireDate"}
                        onChange={(e) => handleExpireDateChange(e)}
                        sx={{width: '40%', marginRight: '10%'}}
                    />
                    <Divider sx={{width: '100%', margin: '20px 0 20px 0'}}/>
                </Grid>
            </Grid>

            <Button
                disabled={buttonDisabled} variant={"contained"} onClick={() => router.push("/send-email")}>Next
                page</Button>
        </Grid>
    </>
}

export default CardInfoPage