import {FC, PropsWithChildren} from "react";
import ApplicationWrapper from "@/app/wrappers/ApplicationWrapper";
import {Box} from "@mui/material";
import {InfoContextProvider} from "@/lib/context/InfoContext";

const PagesLayout: FC<PropsWithChildren> = ({children}) => {
    return <>
        <Box sx={{}}>
            <InfoContextProvider>
                <ApplicationWrapper>{children}</ApplicationWrapper>
            </InfoContextProvider>
        </Box>
    </>
}

export default PagesLayout;