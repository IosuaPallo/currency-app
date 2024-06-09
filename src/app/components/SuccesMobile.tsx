import {Box, Typography, useMediaQuery} from "@mui/material";
import {CheckCircleOutlined} from "@mui/icons-material";
import {useInfoContext} from "@/lib/context/InfoContext";


const SuccessMobile = () => {

    const infoContext = useInfoContext()
    const matchesMD = useMediaQuery("(min-width:900px)")
    return <>

        <Box sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: 'center',
            borderRadius: '50%',
            background: 'rgba(0,255,0,0.1)',
        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '45%',
                    height: '300px',
                    margin: '15% 0 5% 0',
                }}>
                <CheckCircleOutlined
                    sx={{
                        fontSize: '80px',
                        color: 'green',
                        margin: '100px 0 30px 0 ',
                    }}/>
                <Typography sx={{fontSize: '22px', fontWeight: '600', margin: '0 0 5px 0 '}}>
                    Aufladung erfolgreich
                </Typography>
                <Typography sx={{fontSize: '18px', fontWeight: '100', color: 'rgba(100,100,100,0.8)'}}>Die
                    Rufnummer {infoContext.phoneNumber} wurde erfolgreich
                    mit {infoContext.amount + " \u20AC"} </Typography>
            </Box>
        </Box>
    </>
}

export default SuccessMobile;