import React, { useState } from "react";
import { styled } from '@glitz/react';
import {getStarRating, getFormatDate} from "../shared/utilities";
//import { id } from "date-fns/locale";
// import {Link} from "react-router-dom";

export default function ReviewCard(props){
    const [content,] = useState(props.location.state.content);

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

const color = "#bd99db";



const Container = styled.div({
    width: "90%",
    backgroundColor: color,
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
    borderRadius: "5px",
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
    backgroundColor: color,
});

const SecondaryContainer = styled.div({
    width: "13rem",

    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: {
        xy: "10px"
    },
    backgroundColor: color,
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
    backgroundColor: color,
    color: "#ffff00",
});

const ImageContainer = styled.div({
    width: "100%",
    height: "80%",
    backgroundColor: color,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    
    boxSizing: "border-box",

    // padding: {
    //     xy: "10px"
    // },
    // boxSizing: "border-box",
});

const Img = styled.img({
    height: "12rem",
    margin: {
        bottom: "1.5rem",
    },
    border: "1px solid black",
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
        bottom: "10px",
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




