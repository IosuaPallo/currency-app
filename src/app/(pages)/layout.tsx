import {FC, PropsWithChildren} from "react";
import {ApplicationWrapper} from "@/app/wrappers/ApplicationWrapper";
import {Box} from "@mui/material";

const PagesLayout: FC<PropsWithChildren> = ({children}) => {
    return <>
        <Box sx={{}}>
            <ApplicationWrapper>{children}</ApplicationWrapper>
        </Box>
    </>
}

export default PagesLayout;