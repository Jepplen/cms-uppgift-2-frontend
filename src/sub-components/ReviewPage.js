import React, { useEffect, useState } from "react";
import { styled } from '@glitz/react';
import axios from "axios";
import {getStarRating, getFormatDate} from "../shared/utilities";
//import { id } from "date-fns/locale";
// import {Link} from "react-router-dom";

export default function ReviewCard(props){
    const [content,] = useState(props.location.state.content);
    console.log(content)

    return(
        <Container>
            <PrimaryContainer>
                <HeaderContainer>
                    <HeaderText>
                        {content.reviewHeader}    
                    </HeaderText>
                </HeaderContainer>
                <DetailsContainer>
                    <Author>
                        Review by {content.author}
                    </Author>
                    <Date>
                        Published {getFormatDate(content.publishDate)}
                    </Date>                    
                </DetailsContainer>
                <ReviewContent>
                    {content.reviewContent}
                </ReviewContent>
            </PrimaryContainer>
            <SecondaryContainer>
                <RatingContainer>
                    {getStarRating(content.rating)}
                </RatingContainer>
                <ImageContainer>
                    <GameName>
                        {content.gameName}
                    </GameName>
                    <Img src={content.boxArtUrl} />
                </ImageContainer>
            </SecondaryContainer>
        </Container>
    );
}


const Container = styled.div({
    width: "90%",
    backgroundColor: "dodgerblue",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: {
        xy: "20px",
    },
    padding: {
        xy: "10px"
    },
});

const PrimaryContainer = styled.div({
    width: "75%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    padding: {
        xy: "10px"
    },
    backgroundColor: "chocolate",
});

const SecondaryContainer = styled.div({
    width: "13rem",

    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: {
        xy: "10px"
    },
    backgroundColor: "beige",
});

const GameName = styled.p({
    padding: {
        xy: "6px",
        top: "10px",
        bottom: "15px",
    },
    boxSizing: "border-box",
});

const RatingContainer = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: {xy: "5px"},
    boxSizing: "border-box",
    backgroundColor: "green",
});

const ImageContainer = styled.div({
    width: "100%",
    height: "80%",
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    border: "black solid 1px",
    boxSizing: "border-box",

    // padding: {
    //     xy: "10px"
    // },
    // boxSizing: "border-box",
});

const Img = styled.img({
    height: "12rem",
    padding: {
        bottom: "1.5rem",
    }
});

const HeaderContainer = styled.div({
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: {
        bottom: "3px",
    },
    borderBottom: "black solid 1px",
    boxSizing: "border-box",
});

const HeaderText = styled.p({
    fontSize: "20px",
    padding: {
        left: "10px",
    },
    boxSizing: "border-box",
});

const DetailsContainer = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: {
        bottom: "3px",
    },
    boxSizing: "border-box",
});

const Author = styled.p({
    fontSize: "14px",
    fontStyle: "italic",
    padding: {
        left: "10px",
        top: "7px",
        bottom: "3px",
    },
});

const Date = styled.p({
    fontSize: "14px",
    fontStyle: "italic",
    padding: {
        right: "10px",
        top: "7px",
        bottom: "3px",
    },
});

const ReviewContent = styled.p({
    width: "100%",
    fontSize: "16px",
    padding: {
        top: "10px",
        bottom: "20px",
    }
});




