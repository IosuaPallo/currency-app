import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";

type SumRadioGroupProps = {
    onValueChange: (value: number) => void;
    boxWidth: number;
}

const values = [15, 20, 30, 50];

const SumRadioGroup = (props: SumRadioGroupProps) => {

    const {onValueChange, boxWidth} = props;

    const [value, setValue] = useState<number>(0);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt((event.target as HTMLInputElement).value));
    };

    useEffect(() => {
        onValueChange(value);
    }, [value]);

    return <>
        <FormControl required error={value === 0} component={"fieldset"}>
            <FormLabel id="demo-controlled-radio-buttons-group">Aufladebetrag</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                sx={{display: 'flex', flexDirection: 'row'}}
            >
                {values.map(value => (
                    <Box
                        key={value}
                        sx={{
                            border: '1px solid black',
                            borderRadius: '5px',
                            margin: '5px 5px 0 5px',
                            padding: '5px',
                            width: `${(boxWidth - 15 * values.length) / values.length}px`,
                            height: '45px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                    >
                        <FormControlLabel
                            value={`${value}`}
                            control={<Radio/>}
                            label={`\u20AC ${value}`}
                        />
                    </Box>
                ))}
            </RadioGroup>
        </FormControl>
    </>
}

export default SumRadioGroup;