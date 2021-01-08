import React, {useState, useEffect} from "react";
import {styled} from "@glitz/react";
import axios from "axios";
import {getStarRating, getFormatDate, shortenString, getAverageStarRating} from "../shared/utilities";
import {Link} from "react-router-dom";

export default function GamePage(props){
    const [rating, setRating] = useState(null);
    console.log(props);
    const [game, setGame] = useState(null);

    useEffect(() => {
        getGame();
    },[props.location.state.game.id]);

    function getGame(){
        axios.get(`/games/${props.location.state.game.id}`
        ).then((response) => {
            console.log(response.data);
            setGame(response.data);
            setRating(getAverageStarRating(response.data.reviews));
        }).catch((err) => {
            console.error(err);
        });
    }

    if (!game || !rating){
        return <div />;
    }


    return(
        <Container>
            <GameContainer>
                <GameTitle>{game.title}</GameTitle>
                {!!game.reviews.length && 
                    <RatingContainer>
                        <RatingAveraged>{rating.rating}</RatingAveraged>
                        <RatingAveragedText>{game.reviews.length} review{game.reviews.length > 1 ? "s" : ""} (average score {rating.average})</RatingAveragedText>
                    </RatingContainer>
                }
                <BoxArtImg src={game.box_art.url}/>
                <GameDescription>{game.description}</GameDescription>
            </GameContainer>
            <ReviewContainer>
                {!!game.reviews.length ?
                        game.reviews.map(review => 
                            <ReviewCard key={review.id + review.title}>
                                    <ReviewRating>{getStarRating(review.rating)}</ReviewRating>
                                    <ReviewTitle>{review.title}</ReviewTitle>
                                <ReviewAuthorDate>
                                    <ReviewAuthor>Review by {review.owner}</ReviewAuthor>
                                    <ReviewDate>Published {getFormatDate(review.published_at)}</ReviewDate>
                                </ReviewAuthorDate>
                                <ReviewContent>{review.review_content}</ReviewContent>                 
                            </ReviewCard>)
                    :
                        <NoReviewCard>
                            <NoReview>
                                This game has no reviews, be the first to write one. 
                            </NoReview>
                            <Link to={{
                                pathname: "/create-review",
                                state: { content: game }
                                }}
                            >
                                <NewReviewButton>Write a review</NewReviewButton>
                            </Link>
                        </NoReviewCard> 
                }
                   
            </ReviewContainer>
        </Container>
    );
}



const NewReviewButton = styled.button({
    margin: {
        top: "10px",
    },
    width: "150px",
    height: "50px",
    backgroundColor: "#9100ff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    outline: "none",
    ':hover': {
        backgroundColor: "#c981ff",
    },
    ':active': {
        backgroundColor: "#450079",
    },
});

const Container = styled.div({
    display: "flex",
    justifyContent: "space-between",
    padding: {
        top: "50px"
    }
    
});

const GameContainer = styled.div({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //border: "1px solid black",
    boxSizing:"border-box",
    padding: {
        x: "10px",
        y: "15px",
        top: "10px",
        bottom: "10px",
    },
    margin: {
        left: "40px",
        bottom: "40px",
    },
});

const GameTitle = styled.p({
    fontSize: "20px",
    margin: {
        bottom: "15px",
    },

});

const GameDescription = styled.p({
    fontSize: "14px",

});

const BoxArtImg = styled.img({
    height: "200px",
    margin: {
        bottom: "25px",
    },
});

const ReviewContainer = styled.div({
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxSizing:"border-box",
    margin: {
        right: "40px",
        bottom: "40px",
    },
});

const ReviewCard = styled.div({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: {
        x: "10px",
        y: "10px",
    },
    margin: {
        bottom: "10px",
    },
    boxSizing: "border-box",
    //border: "1px solid black",
    backgroundColor: "#e8aa61",
    //filter: "brightness(85%)",
    border: "1px solid white",
    borderRadius: "10px",
});

const ReviewTitle = styled.p({
    fontSize: "20px",
});

const ReviewAuthorDate = styled.div({
    display: "flex",
    justifyContent: "space-between",
    with: "100%",
    padding: {
        bottom: "10px",
    },
    borderBottom: "1px solid grey",
});
const ReviewAuthor = styled.p({
    width: "30%",
});

const ReviewDate = styled.p({
    width: "30%",
});

const ReviewTitleRating = styled.div({
    display: "flex",
    with: "100%",
});

const ReviewRating = styled.div({
    width: "125px",
});

const ReviewContent = styled.p({
    padding: {
        xy: "10px",
    }
});

const RatingAveraged = styled.div({
    display: "flex",

});

const RatingAveragedText = styled.p({
    margin: {
        top: "1px",
        bottom: "15px",
    },
});

const RatingContainer = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

const NoReviewCard = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: {
        x: "10px",
        y: "10px",
    },
    margin: {
        bottom: "10px",
    },
    boxSizing: "border-box",
    border: "1px solid black",
});

const NoReview = styled.p({

});