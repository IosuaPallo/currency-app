import {ChangeEvent, useEffect, useState} from "react";
import useCreditNumberValidation from "@/lib/hooks/useCreditNumberValidation";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type CreditCardValidationProps = {
    onCreditNumberChange: (creditCard: string) => void;
}

const CreditNumberValidation = (props: CreditCardValidationProps) => {
    const {onCreditNumberChange} = props;

    const [creditNumber, setCreditNumber] = useState('');
    const [showNumber, setShowNumber] = useState(false);

    const creditNumberError = useCreditNumberValidation({creditNumber})

    useEffect(() => {
        onCreditNumberChange(creditNumber)
    }, [creditNumber]);


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


    return <>
        <FormControl sx={{width: '100%'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-cvv">Sicherheitscode</InputLabel>
            <OutlinedInput
                id="outlined-adornment-cvv"
                type={showNumber ? 'text' : 'password'}
                onChange={(e) => handleCreditNumberChange(e)}
                required
                error={creditNumberError}
                label="Kreditkartennummber"
                defaultValue={creditNumber}
                value={creditNumber}
                placeholder={"**** **** **** ****"}
                name={"creditNumber"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowNumber(!showNumber)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                        >
                            {showNumber ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    </>
}

export default CreditNumberValidation;