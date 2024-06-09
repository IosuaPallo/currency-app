import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, useMediaQuery} from "@mui/material";
import {ChangeEvent, useEffect, useState} from "react";

type SumRadioGroupProps = {
    onValueChange: (value: number) => void;
    boxWidth: number;
}

const values = [15, 20, 30, 50];

const SumRadioGroup = (props: SumRadioGroupProps) => {

    const {onValueChange, boxWidth} = props;

    const matchesMD = useMediaQuery("(min-width:900px");

    const [value, setValue] = useState<number>(0);
    const [boxWidthCalculated, setBoxWidthCalculated] = useState(matchesMD ? `${(boxWidth - 10 * values.length) / values.length}px` : 'calc(100%-1px)')

    useEffect(() => {
        setBoxWidthCalculated(matchesMD ? `${(boxWidth - 10 * values.length) / values.length}px` : 'calc(100%-1px)');
    }, [boxWidth, matchesMD]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt((event.target as HTMLInputElement).value));
    };


    useEffect(() => {
        onValueChange(value);
    }, [onValueChange, value]);

    return <>
        <FormControl required error={value === 0} component="fieldset" sx={{width: '100%'}}>
            <FormLabel id="demo-controlled-radio-buttons-group">Aufladebetrag</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
                sx={{
                    ...(matchesMD ? {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '100%',
                    } : {
                        display: 'grid',
                        gridTemplateColumns: matchesMD ? 'repeat(auto-fit, minmax(0, 1fr))' : 'repeat(2, 1fr)',
                        gap: '10px',
                        width: '100%',
                    })

                }}
            >
                {values.map(val => (
                    <Box
                        key={val}
                        sx={{
                            border: '1px solid black',
                            borderRadius: '5px',
                            margin: matchesMD ? '5px 5px 0 5px' : '5px 8px 0 2px',
                            width: boxWidthCalculated,
                            height: '50px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <FormControlLabel
                            value={`${val}`}
                            control={<Radio/>}
                            label={`\u20AC ${val}`}
                        />
                    </Box>
                ))}
            </RadioGroup>
        </FormControl>
    </>
}

export default SumRadioGroup;