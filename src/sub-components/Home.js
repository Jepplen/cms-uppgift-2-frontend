import React, {useState, useEffect} from "react";
import axios from "axios";
import { styled } from '@glitz/react';
import {getStarRating, getFormatDate, shortenString, getAverageStarRating} from "../shared/utilities";

export default function Home(props){
    const [state, setState] = useState({
        reviews: [],

    });

    useEffect(() => {
        axios.get("/reviews")
        .then((response) => {
            let all = response.data;
            let latestSorted = all.sort((a, b) => (a.published_at < b.published_at) - (a.published_at > b.published_at));
            let latest = latestSorted.splice(0, 5);
            setState({...state, reviews: latest});
        })
        .catch((err) => {
            console.error(err);
        });
    },[]);


    console.log(state.reviews);

    return(
        <Container>
            <PageTitle>Welcome to Retro Reviews</PageTitle>
            <PageHeader>Latest reviews</PageHeader>
            <ReviewContainer>
                {state.reviews.map(review =>
                    <ReviewCard>
                        <BoxArtContainer>
                            <BoxArt src={review.game.box_art.url} />
                        </BoxArtContainer>
                        <ReviewColumn>
                            <GameTitleContainer>
                                <ReviewRating>{getStarRating(review.rating)}</ReviewRating>
                                <ReviewTitle>{review.title}</ReviewTitle>  
                            </GameTitleContainer>
                            <ReviewAuthorDate>
                                <ReviewAuthor>Review by {review.owner}</ReviewAuthor>
                                <ReviewDate>Published {getFormatDate(review.published_at)}</ReviewDate>
                            </ReviewAuthorDate>
                            <ReviewContent>{review.review_content}</ReviewContent>
                        </ReviewColumn>   
                    </ReviewCard>
                )}
            </ReviewContainer>
        </Container>
    );
}

const color = "#bd99db";

const ReviewContent = styled.p({
    padding: {
        xy: "15px",
    },
});

const ReviewRating = styled.div({
    width: "125px",
    marginTop: "10px",
    marginLeft: "-5px",
});

const ReviewTitle = styled.p({
    fontSize: "18px",
    margin: {
        bottom: "0px",
    },
});

const ReviewAuthorDate = styled.div({
    display: "flex",
    justifyContent: "space-between",
    width: "98%",
    padding: {
        bottom: "10px",
        left: "13px",
    },

});
const ReviewAuthor = styled.p({
    width: "70%",
    fontStyle: "italic",
});

const ReviewDate = styled.p({
    width: "30%",
    fontStyle: "italic",
});

const GameTitleContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "98%",
    padding: {
        x: "10px",
        bottom: "10px",
    },
    margin: {
        bottom: "10px",
    },
    boxSizing: "border-box",
    //border: "1px solid black",
    backgroundColor: color,
    //filter: "brightness(85%)",
    borderBottom: "1px solid black",
});


const PageTitle = styled.p({
    textAlign: "center",
    width: "200px",
    padding: {
        x: "15px",
        y: "15px",
    },
    animationName: {
        from: {
            transform: "translate(175%, -60px)",

        },
        to: {
            transform: "translate(175%, 0px)",
        },
    },
    animationDuration: "1s",
    backgroundColor: "#2A2A2A",
    color: "#E1E1E1",
    transform: "translateX(175%)",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTop: "1px solid #E1E1E1",
});

const BoxArtContainer = styled.div({
    margin: {
        xy: "15px",
    },
});

const BoxArt = styled.img({
    height: "150px",
    border: "1px solid black",
});

const Container = styled.div({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    //alignItems: "center",
});

const PageHeader = styled.p({
    fonstSize: "20px",
    margin: {
        left: "10%",
    },
});

const ReviewContainer = styled.div({

});

const ReviewColumn = styled.div({
    display: "flex",
    flexDirection: "column",
    width: "100%",
});

const ReviewCard = styled.div({
    width: "80%",
    display: "flex",
    backgroundColor: "white",
    margin: {
        x: "10%",
        y: "20px",
    },
    //boxSizing: "border-box",
    boxSizing: "border-box",
    //border: "1px solid black",
    backgroundColor: color,
    //filter: "brightness(85%)",
    //border: "1px solid white",
    borderRadius: "10px",
});