import { FC, memo } from "react";

import { Box, styled, Typography } from "@mui/material";

const FooterComponent: FC = () => {

    return (
        <FooterContainer>
            <Typography variant="caption">
                <a href="https://github.com/lil-shimon">
                    Powered by Kenta Shimosawa
                </a>
            </Typography>
        </FooterContainer>
    )
}

const FooterContainer = styled(Box)({
    position: "fixed",
    bottom: "0",
    borderTop: "1px solid #e0e0e0",
    width: "100%",
    padding: "1%",
    textAlign: "center",
    backgroundColor: "white"
})

export const Footer = memo(FooterComponent)