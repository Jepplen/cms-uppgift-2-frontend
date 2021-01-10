import React, {useEffect, useState} from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import Accordion from "../shared/Accordion";

export default function GenresNav(){
    const [genres, setGenres] = useState([]);
    
    useEffect(() => {
        getGenres();
    },[]);


    function getGenres(){
        axios.get("/genres"
        ).then((response) => {
            let sortedGenres = response.data.sort((a, b) => (a.genre_name > b.genre_name) - (a.genre_name < b.genre_name));
            for (let genre of sortedGenres){
                genre.games.sort((a, b) => (a.title > b.title) - (a.title < b.title));
            }
            setGenres(sortedGenres);
        }).catch((err) => {
            console.error(err);
        });
    }

    return(
        <GenresBox>
            <HeaderText>Genres</HeaderText>
            <Accordion genres={genres} />
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

const HeaderText = styled.p({
    padding: {y: "20px"},
    boxSizing: "border-box",
    fontSize: "20px",
});