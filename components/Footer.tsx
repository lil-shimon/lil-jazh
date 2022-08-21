import { FC, memo } from "react";
import { Box, styled, Typography } from "@mui/material";

const FooterComponent: FC = () => {

    return (
        <FooterContainer>
            <FooterText variant="caption">
                <a href="https://github.com/lil-shimon">
                    Powered by Kenta Shimosawa
                </a>
            </FooterText>
        </FooterContainer>
    )
}

const FooterContainer = styled(Box)({
    position: "fixed",
    bottom: "0",
    borderTop: "1px solid #e0e0e0",
    width: "100%",
    padding: "1%",
    textAlign: "center"
})

const FooterText = styled(Typography)({
    color: "black"
})

export const Footer = memo(FooterComponent)