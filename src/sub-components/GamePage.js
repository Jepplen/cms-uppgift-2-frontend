import React, {useState, useEffect} from "react";
import {styled} from "@glitz/react";
import axios from "axios";
import {getStarRating, getFormatDate, shortenString, getAverageStarRating} from "../shared/utilities";
import {Link, Redirect} from "react-router-dom";

export default function GamePage(props){
    const [rating, setRating] = useState(null);
    const [game, setGame] = useState(null);

    useEffect(() => {
        if (props.location.state){
            getGame();
        } 
    },[props.location.state && props.location.state.game.id]);

    function getGame(){
        axios.get(`/games/${props.location.state.game.id}`
        ).then((response) => {
            let game = response.data;
            game.reviews.sort((a, b) => (a.published_at < b.published_at) - (a.published_at > b.published_at));
            setGame(game);
            setRating(getAverageStarRating(response.data.reviews));
        }).catch((err) => {
            console.error(err);
        });
    }

    if (!game || !rating){
        return <div />;
    }

    return(
        <SuperContainer>
            <PageTitle>{game.title}</PageTitle>
            <Container>
            
            <GameContainer>
                    <GameTitle>{game.title}</GameTitle>
                {!!game.reviews.length ? 
                    <RatingContainer>
                        <RatingAveraged>{rating.rating}</RatingAveraged>
                        <RatingAveragedText>{game.reviews.length} review{game.reviews.length > 1 ? "s" : ""} (average score {rating.average})</RatingAveragedText>
                    </RatingContainer>
                    :
                    <RatingContainer>
                        <RatingAveragedText>(This game has not been rated yet)</RatingAveragedText>
                    </RatingContainer>
                }
                <BoxArtContainer>
                    <BoxArtImg src={game.box_art.url}/>
                </BoxArtContainer>
                <GameDescription>{game.description}</GameDescription>
            </GameContainer>
            <ReviewContainer>
                {!!game.reviews.length && 
                <NewReviewContainer>
                    <NewReviewText></NewReviewText>
                    <Link to={{
                        pathname: "/create-review",
                        state: { content: game }
                        }}
                    >
                        <NewReviewButtonSmall>New review</NewReviewButtonSmall>
                    </Link>
                </NewReviewContainer> 
                }
                {!!game.reviews.length ?
                        game.reviews.map(review => 
                            <ReviewCard key={review.id + review.title}>
                                <GameTitleContainer>
                                    <ReviewTitle>{review.title}</ReviewTitle>
                                    <ReviewRating>{getStarRating(review.rating)}</ReviewRating>
                                </GameTitleContainer>
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
        </SuperContainer> 
    );
}

const NewReviewText = styled.p({
  
});

const NewReviewContainer = styled.div({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: {
        bottom: "10px",
    },
});

const color = "#bd99db";

const SuperContainer = styled.div({
    display: "flex",
    flexDirection: "column",
});

const PageTitle = styled.p({
    textAlign: "center",
    width: "20%",
    //width: "200px",
    padding: {
        x: "15px",
        y: "15px",
    },
    animationName: {
        from: {
            transform: "translate(126%, -60px)",

        },
        to: {
            transform: "translate(126%, 0px)",
        },
    },
    animationDuration: "1s",
    backgroundColor: "#2A2A2A",
    color: "#E1E1E1",
    transform: "translateX(126%)",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTop: "1px solid #E1E1E1",
});

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

const NewReviewButtonSmall = styled.button({
    margin: {
        top: "10px",
    },
    width: "100px",
    height: "25px",
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

const GameTitleContainer = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: color,
    //filter: "brightness(85%)",
    borderBottom: "1px solid black",
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

const BoxArtContainer = styled.div({
    margin: {
        bottom: "25px",
    },
});

const BoxArtImg = styled.img({
    height: "200px",
    border: "1px solid black",
    animationName: {
        from: {
            transform: "scaleX(0)",
        },
        to: {
            transform: "scaleX(1)",
        },
    },
    animationDuration: "1s",
    transform: "scale(1)",
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
    backgroundColor: color,
    //filter: "brightness(85%)",
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
        x: "10px",
        bottom: "10px",
    },
   // borderBottom: "1px solid grey",
});
const ReviewAuthor = styled.p({
    width: "70%",
    fontStyle: "italic",
});

const ReviewDate = styled.p({
    width: "30%",
    fontStyle: "italic",
});

const ReviewTitleRating = styled.div({
    display: "flex",
    flexDirection: "row",
    width: "100%",
});

const ReviewRating = styled.div({
    width: "125px",
    color: "yellow",
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
    borderRadius: "5px",
    backgroundColor: color,
});

const NoReview = styled.p({

});