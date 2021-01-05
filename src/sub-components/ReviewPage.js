import React, { useEffect, useState } from "react";
import { styled } from '@glitz/react';
import StarFullIcon from '@material-ui/icons/Star';
import StarEmptyIcon from '@material-ui/icons/StarBorder';
import axios from "axios";
//import { id } from "date-fns/locale";
// import {Link} from "react-router-dom";

export default function ReviewCard(props){
    const [content,] = useState(props.location.state.content);
    console.log(content)
    // console.log(props.review);
    // const [content, setContent] = useState({
    //     gameName: props.review.game_name,
    //     gameId: props.review.game,
    //     reviewId: props.review.id,
    //     profileId: props.review.profile,
    //     rating: props.review.rating,
    //     userId: props.review.author,
    //     reviewContent: props.review.review_content,
    //     reviewHeader: props.review.title,
    //     publishDate: props.review.published_at,
    //     lastUpdateDate: props.review.updated_at,
    //     boxArtUrl: "",
    //     genre: "",
    //     gameDescription: "",
    // });
    // console.log(props.review);

    // useEffect(() => {
    //     getBoxArt();
    // },[]);

    // function getBoxArt(){
    //     console.log(props.review)

        

    //     const config = {
    //         headers: { Authorization: `Bearer ${props.token}` }
    //     };


    //     axios.get(`/games/${props.review.game}`, config
    //     ).then(response => {
    //         console.log("HERE 2")
    //         console.log(response);
    //         setContent({
    //             ...content,
    //             boxArtUrl: response.data.box_art.url,
    //             genre: response.data.genre.genre_name,
    //             gameDescription: response.data.description,
    //         });
    //         //setReviews(response.data.reviews);
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // }

    // console.log(content);

    function starRating(){
        let starArray = [];
        for (let i = 0; i < content.rating; i++) {
            starArray.push(<StarFullIcon />);
        } 

        if (content.rating < 5){
            for (let i = 0; i < (5 - content.rating); i++) {
                starArray.push(<StarEmptyIcon />)
            }
        }
        return starArray;
    }

    function formatDate(){
        let date = content.publishDate;
        let index = date.indexOf("T");
        return date.substring(0, index);
    }

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
                        Published {formatDate()}
                    </Date>                    
                </DetailsContainer>
                <ReviewContent>
                    {content.reviewContent}
                </ReviewContent>
            </PrimaryContainer>
            <SecondaryContainer>
                <RatingContainer>
                    {starRating()}
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




