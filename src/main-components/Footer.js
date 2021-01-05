import React from "react";
import { styled } from '@glitz/react';

export default function Footer(){
    return(
        <FooterBox>
            <p>© 2020 retro-reviews.com</p>
        </FooterBox>
    );
}

const FooterBox = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "10vh",
    backgroundColor: "#252525",
    color: "white",
});