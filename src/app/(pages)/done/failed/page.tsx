"use client"
import {Box, Button, Typography, useMediaQuery} from "@mui/material";
import {useRouter} from "next/navigation";
import FailedMobile from "@/app/components/FailedMobile";
import {CancelOutlined} from "@mui/icons-material";

const FailedPage = () => {
    const router = useRouter();

    const matchesMD = useMediaQuery("(min-width:900px)")
    return <>
        <Box sx={{
            ...{
                display: 'flex',
                width: '100%',
                height: '100%',
                textAlign: 'start',
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
            <Box sx={{overflow: 'hidden', height: '100%', width: '100%'}}>
                {matchesMD ? (
                    <Box
                        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <CancelOutlined
                            sx={{
                                fontSize: '80px',
                                color: 'red',
                                margin: '100px 0 30px 0 ',
                            }}/>
                        <Typography sx={{fontSize: '25px', fontWeight: '600', margin: '0 0 5px 0 '}}>Ein
                            Fehler
                            ist
                            aufgetreten</Typography>
                        <Typography sx={{fontSize: '18px', fontWeight: '100', color: 'rgba(100,100,100,0.8)'}}>Die
                            Bezahlung ist
                            fehlgeschlagen, bitte
                            probieren Sie es erneut.</Typography>
                    </Box>) : (
                    <Box sx={{
                        width: '200%',
                        height: '100%',
                        transform: 'translateX(-25%)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}><FailedMobile/></Box>)}

            </Box>
            <Button sx={{margin: '60px 0 0 0', width: matchesMD ? '300px' : '90%', height: '50px'}}
                    variant={"contained"}
                    onClick={() => router.push("/choose")}>Neue Bestellung</Button>
        </Box>
    </>
}

export default FailedPage;