'use client'
import {FC, PropsWithChildren} from "react";
import {Box, CssBaseline, Typography, useMediaQuery} from "@mui/material";

const ApplicationWrapper: FC<PropsWithChildren> = ({children}) => {


    const matchesMD = useMediaQuery("(min-width:900px)")


    return <>
        <CssBaseline>
            <Box sx={{
                ...{
                    position: 'relative',
                    backgroundColor: 'rgba(200,200,200,0.3)',
                    width: '100%',
                    minHeight: '100vh',
                    zIndex: 0,
                },
            }}>
                <Box sx={{
                    width: '100%',
                    background: "#1565c0",
                    height: '70px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10,
                    position: 'absolute',
                }}>
                    {matchesMD ? (<img src={"/O2.png"} alt={""}
                                       style={{
                                           width: '30px',
                                           height: '30px',
                                           margin: '0 20px 0 0',
                                       }}/>) : (<img src={"/O2.png"} alt={""}
                                                     style={{
                                                         width: '30px',
                                                         height: '30px',
                                                         margin: '0 20px 0 0',
                                                         position: 'absolute',
                                                         left: 20,
                                                     }}/>)}

                    <Typography sx={{fontWeight: '600', color: 'white', fontSize: '25px'}}>Guthaben
                        aufladen</Typography>
                </Box>
                <Box sx={{padding: matchesMD ? '80px 0 0 0 ' : '0', width: '100%', height: '100%'}}>
                    {children}
                </Box>
            </Box>
        </CssBaseline>
    </>
}

export default ApplicationWrapper;
