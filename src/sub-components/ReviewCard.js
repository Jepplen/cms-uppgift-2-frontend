import React, { useEffect, useState } from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {getStarRating, getFormatDate, shortenString} from "../shared/utilities";
import {Redirect, Link} from "react-router-dom";

export default function ReviewCard(props){
    console.log(props);
    console.log(props.review);
    const [content, setContent] = useState({
        author: props.userData.username,
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

    useEffect(() => {
        getBoxArt();
    },[]);

    function getBoxArt(){
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };

        axios.get(`/games/${props.review.game}`, config
        ).then(response => {
            setContent({
                ...content,
                boxArtUrl: response.data.box_art.url,
                genre: response.data.genre.genre_name,
                gameDescription: response.data.description,
            });
        }).catch(err => {
            console.error(err);
        });
    }

    function handleDelete(){
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };

        axios.delete(`/reviews/${content.reviewId}`, config
        ).then(() => {
            props.getReviews();
        }).catch(err => {
            console.error(err);
        });
    }

    return(
        <Card>
            <HeaderContainer>
                <GameName>{content.gameName}</GameName>
            </HeaderContainer>
            <SecondaryContainer>
                <ImageContainer>
                    <Image src={content.boxArtUrl} />
                </ImageContainer>
                <TextContainer>
                    <StarRating>{getStarRating(content.rating)}</StarRating>               
                    <ReviewHeader>{shortenString(content.reviewHeader, 20)}</ReviewHeader>
                    <Date>{getFormatDate(content.publishDate)}</Date>
                        <ButtonContainer>
                            <Link to={{            
                                    pathname: "/review",
                                    state: { content: content }
                                }}
                                style={{width: "30%"}}
                            >
                                <ViewButton>View</ViewButton>
                            </Link>    
                            <Link                         
                                to={{
                                pathname: "/edit-review",
                                state: { content: content }
                                }}
                                style={{width: "30%"}}
                            >
                                <EditButton>Edit</EditButton>
                            </Link>                       
                            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
                        </ButtonContainer>
                </TextContainer>
            </SecondaryContainer>
        </Card>
        
    );
}

const ReviewHeader = styled.p({
    color: "black",
});

const StarRating = styled.div({
    color: "#ffff00",
});

const GameName = styled.p({
    fontSize: "18px",
    color: "black",
});

const Date = styled.p({
    fontStyle: "italic",
    fontSize: "13px",
    color: "black",
});

const SecondaryContainer = styled.div({
    width: "100%",
    display: "flex",
});

const HeaderContainer = styled.div({
    width: "100%",
    margin: {
        bottom: "7px",
    },
});

const ButtonContainer = styled.div({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
}); 

const ViewButton = styled.button({
    margin: {
        top: "10px",
    },
    width: "100%",
    height: "25px",
    backgroundColor: "#9100ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    ':hover': {
        backgroundColor: "#b455fc",
    },
    ':active': {
        backgroundColor: "#450078",
    },
});

const EditButton = styled.button({
    margin: {
        top: "10px",
    },
    width: "100%",
    height: "25px",
    backgroundColor: "#9100ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    ':hover': {
        backgroundColor: "#b455fc",
    },
    ':active': {
        backgroundColor: "#450078",
    },
});

const DeleteButton = styled.button({
    margin: {
        top: "10px",
    },
    width: "30%",
    height: "25px",
    backgroundColor: "#e70006",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    ':hover': {
        backgroundColor: "#ff686c",
    },
    ':active': {
        backgroundColor: "#8b0003",
    },
});

const color = "#bd99db";

const Card = styled.div({
    width: "300px",
    height: "160px",
    backgroundColor: color,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    margin: {
        xy: "20px",
    },
    padding: {
        xy: "10px"
    },
    boxSizing: "border-box",
    transition: "all 0.3s",
    ':hover': {
        boxShadow: "0px 14px 23px -5px rgba(0,0,0,0.7)",
    },
    borderRadius: "5px",
});

const TextContainer = styled.div({
    width: "75%",
    height: "100%",
    backgroundColor: color,
});

const ImageContainer = styled.div({
    height: "100px",
    padding: {
        top: "0px",
        right: "15px",
    },

});

const Image = styled.img({
    height: "100px",

    border: "1px solid black",
    
});

