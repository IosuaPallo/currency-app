import {Box, Typography, useMediaQuery} from "@mui/material";
import {CancelOutlined} from "@mui/icons-material";

const FailedMobile = () => {
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
            background: 'rgba(255,0,0,0.1)',
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
                    margin: '15% 0 0 0',
                }}>
                <CancelOutlined
                    sx={{
                        fontSize: matchesMD ? '80px' : '80px',
                        color: 'red',
                        margin: '0 0 10px 0'
                    }}/>
                <Typography sx={{fontSize: '22px', fontWeight: '600', margin: '10px 0 5px 0 '}}>Ein
                    Fehler
                    ist
                    aufgetreten</Typography>
                <Typography sx={{fontSize: '18px', fontWeight: '100', color: 'rgba(100,100,100,0.8)'}}>Die Bezahlung ist
                    fehlgeschlagen, bitte
                    probieren Sie es erneut.</Typography>
            </Box>
        </Box>
    </>
}

export default FailedMobile;