"use client"
import {Box, Button, Card, Typography, useMediaQuery} from "@mui/material";
import {useRouter} from "next/navigation";
import {ArticleOutlined, CheckCircleOutlined, LoopRounded} from "@mui/icons-material";
import {useInfoContext} from "@/lib/context/InfoContext";
import SuccessMobile from "@/app/components/SuccesMobile";

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
                    }}><SuccessMobile/></Box>)}

            </Box>

            {matchesMD &&
                <Card sx={{
                    width: '40%',
                    margin: '100px 0 0px 0',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '100px'
                }}>
                    <Box
                        sx={{
                            width: '50px',
                            backgroundColor: '#1565c0',
                            height: '50px',
                            margin: '0 10px 0 10px',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <LoopRounded
                            sx={{
                                color: '#1565c0',
                                position: 'absolute',
                                zIndex: 10,
                                left: '4px',
                                background: 'white',
                                borderRadius: '50%',

                            }}
                        />
                        <ArticleOutlined
                            sx={{
                                color: '#1565c0',
                                position: 'absolute',
                                zIndex: 0,
                                right: '5px',
                                background: 'white',
                                margin: '2px 0 0 0',
                                fontSize: '30px'
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            width: '90%'
                        }}>
                        <Typography sx={{fontWeight: '600'}}>In Zufunkt automatisch auflden?</Typography>
                        <Typography sx={{color: 'rgba(100,100,100,0.3)', fontSize: '12'}}>Noch komfortabler geht es mit
                            unserer
                            automatischen Aufladung!</Typography>
                    </Box>
                </Card>
            }

            <Button sx={{margin: '60px 0 0 0', width: matchesMD ? '40%' : '90%', height: '50px'}}
                    variant={"contained"}
                    onClick={() => router.push("/choose")}>Jetzt einrichten</Button>
        </Box>
    </>
}

export default SuccessPage;