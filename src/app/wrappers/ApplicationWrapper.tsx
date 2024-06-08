import {FC, PropsWithChildren} from "react";
import {Box, CssBaseline} from "@mui/material";

export const ApplicationWrapper: FC<PropsWithChildren> = ({children}) => {
    return <>
        <CssBaseline>
            <Box sx={{
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: "center",
                backgroundColor: 'rgba(200,200,200,0.5)',
                width: '100%',
                minHeight: '100vh'
            }}>
                {children}
            </Box>
        </CssBaseline>
    </>
}
