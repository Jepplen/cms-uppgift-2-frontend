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
                        <BoxArt src={review.game.box_art.url} />
                        <ReviewColumn>
                            <ReviewRating>{getStarRating(review.rating)}</ReviewRating>
                                    <ReviewTitle>{review.title}</ReviewTitle>
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

const ReviewContent = styled.p({
    padding: {
        xy: "15px",
    },
});

const ReviewRating = styled.div({
    width: "125px",
    marginTop: "10px",
});

const ReviewTitle = styled.p({
    fontSize: "20px",
    margin: {
        bottom: "10px",
    },
});

const ReviewAuthorDate = styled.div({
    display: "flex",
    justifyContent: "space-between",
    width: "98%",
    padding: {
        bottom: "10px",
    },
    borderBottom: "1px solid grey",
});
const ReviewAuthor = styled.p({
    width: "70%",
});

const ReviewDate = styled.p({
    width: "30%",
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


const BoxArt = styled.img({
    height: "150px",
    padding: {
        xy: "15px",
    },
    boxSizing: "border-box",
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
    backgroundColor: "#ffca7c",
    //filter: "brightness(85%)",
    border: "1px solid white",
    borderRadius: "10px",
});