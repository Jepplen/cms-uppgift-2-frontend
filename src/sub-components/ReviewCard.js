import React, { useEffect, useState } from "react";
import { styled } from '@glitz/react';
import axios from "axios";
//import { id } from "date-fns/locale";
import {Redirect} from "react-router-dom";

export default function ReviewCard(props){
    console.log(props.review);
    const [content, setContent] = useState({
        gameName: props.review.game_name,
        gameId: props.review.game,
        reviewId: props.review.id,
        profileId: props.review.profile,
        rating: props.review.rating,
        userId: props.review.author,
        reviewContent: props.review.review_content,
        reviewHeader: props.review.title,
        publishDate: props.review.published_at,
        lastUpdateDate: props.review.updated_at,
        boxArtUrl: "",
        genre: "",
        gameDescription: "",
    });
    const [loadReview, setLoadReview] = useState(false);
    console.log(props.review);

    useEffect(() => {
        getBoxArt();
    },[]);

    function getBoxArt(){
        console.log(props.review)

        

        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };


        axios.get(`/games/${props.review.game}`, config
        ).then(response => {
            console.log("HERE 2")
            console.log(response);
            setContent({
                ...content,
                boxArtUrl: response.data.box_art.url,
                genre: response.data.genre.genre_name,
                gameDescription: response.data.description,
            });
            //setReviews(response.data.reviews);
        }).catch(err => {
            console.error(err);
        });
    }

    console.log(content);

    if (loadReview){
        return <Redirect to="/review" />
    }

    return(

        <Card onClick={() => setLoadReview(true)}>
            <TextContainer>
                <h1>Title: {props.review.game_name}</h1>
                <p>Rating: {props.review.rating}</p>
                <p>Header: {props.review.title}</p>
                <p>Content: {props.review.review_content}</p>
            </TextContainer>
            <ImageContainer>
                <Image src={content.boxArtUrl} />
            </ImageContainer>
        </Card>
    );
}




const Card = styled.div({
    width: "75%",
    height: "25%",
    backgroundColor: "dodgerblue",
    display: "flex",
    justifyContent: "space-between",
    margin: {
        xy: "20px",
    },
    padding: {
        xy: "10px"
    },

});

const TextContainer = styled.div({
    width: "75%",
    height: "100%",
    backgroundColor: "dodgerblue",
});

const ImageContainer = styled.div({
    width: "15%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
});

const Image = styled.img({
    height: "100px",
    padding: {
        xy: "10px",
    },
    
});