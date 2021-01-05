import React from "react";
import {Link} from "react-router-dom";
import { styled } from '@glitz/react';

export default function GenresNav(){
    return(
        <GenresBox>
            <HeaderText>Genres</HeaderText>
            <Link to="/genre">
                <p>Adventure</p>
            </Link>
        </GenresBox>
    );
}

const GenresBox = styled.div({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    padding: {y: "20px" },
    width: "15vw",
    minHeight: "80vh",
    fontSize: "16px",
    boxSizing: "border-box",
    backgroundColor: "lightgrey",
});

const HeaderText = styled.h3({
    padding: {y: "20px"},
    boxSizing: "border-box",
    fontSize: "26px",
});