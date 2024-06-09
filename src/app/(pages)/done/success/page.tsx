"use client"
import {Box, Button, Typography, useMediaQuery} from "@mui/material";
import {useRouter} from "next/navigation";
import FailedMobile from "@/app/components/FailedMobile";
import {CheckCircleOutlined} from "@mui/icons-material";
import {useInfoContext} from "@/lib/context/InfoContext";

const SuccessPage = () => {
    const router = useRouter();
    const infoContext = useInfoContext();

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
                        <CheckCircleOutlined
                            sx={{
                                fontSize: '80px',
                                color: 'green',
                                margin: '100px 0 30px 0 ',
                            }}/>
                        <Typography sx={{fontSize: '25px', fontWeight: '600', margin: '0 0 5px 0 '}}>
                            Aufladung erfolgreich
                        </Typography>
                        <Typography sx={{fontSize: '18px', fontWeight: '100', color: 'rgba(100,100,100,0.8)'}}>Die
                            Rufnummer {infoContext.phoneNumber} wurde erfolgreich
                            mit {infoContext.amount + " \u20AC"} </Typography>
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

export default SuccessPage;