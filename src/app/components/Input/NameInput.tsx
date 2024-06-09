import {ChangeEvent, useEffect, useState} from "react";
import {TextField, useMediaQuery} from "@mui/material";

type NameInputProps = {
    onNameChange: (name: string) => void;
}

const NameInput = (props: NameInputProps) => {
    const {
        onNameChange
    } = props;

    const matchesMD = useMediaQuery("(min-width:900px)");

    const [name, setName] = useState('');

    const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setName(e.target.value);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            onNameChange(name);
        }, 4000);

        return () => clearTimeout(timeout);
    }, [name, onNameChange]);


    return <>
        <TextField
            required
            label={matchesMD ? "Name" : "Name des Karteninhabers"}
            defaultValue={name}
            name={"name"}
            placeholder={"Name des Karteninhabers"}
            onChange={(e) => handleNameChange(e)}
            sx={{width: '100%', margin: '15px 0 15px 0'}}
        />
    </>
}

export default NameInput;