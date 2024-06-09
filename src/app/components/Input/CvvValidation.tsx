import {ChangeEvent, useEffect, useState} from "react";
import useCvvValidation from "@/lib/hooks/useCvvValidation";
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type CvvValidationProps = {
    onCvvChange: (name: string) => void;
}

const CvvValidation = (props: CvvValidationProps) => {
    const {onCvvChange} = props;

    const [cvv, setCvv] = useState("");
    const [showCvv, setShowCvv] = useState(false);

    const cvvError = useCvvValidation({cvv})

    const handleCvvChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length == 0 || e.target.value.length < 4 && ((e.target.value[e.target.value.length - 1] >= '0' && e.target.value[e.target.value.length - 1] <= '9'))) {
            setCvv(e.target.value);
        }
    }

    useEffect(() => {
        onCvvChange(cvv);
    }, [cvv]);

    return <>
        <FormControl sx={{width: '45%'}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-cvv">Sicherheitscode</InputLabel>
            <OutlinedInput
                id="outlined-adornment-cvv"
                type={showCvv ? 'text' : 'password'}
                onChange={(e) => handleCvvChange(e)}
                required
                error={cvvError}
                label="Sicherheitscode"
                value={cvv}
                placeholder={"CVV"}
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
    </>
}

export default CvvValidation;


