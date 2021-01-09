import react,{useState, useEffect} from "react";
import ReviewCard from "./ReviewCard";
import {Link, Redirect} from "react-router-dom";
import { styled } from '@glitz/react';
import axios from "axios";
import CookieService from "../services/CookieService";


export default function MyReviews(props){
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getReviews();
    },[]);


    function getReviews(){
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };
        axios.get(`/profiles/${props.userData.profileId}`, config
        ).then(response => {
            setReviews(response.data.reviews);
        }).catch(err => {
            console.error(err);
        });
    }


    if (!props.isAuthed){
        return <Redirect to="/" />
    }

    if(!reviews){
        console.log("DDDDDDDDDDDDDDDDD")
        return <div />
    }
    

    return(
        <Container>
            <PageTitleContainer>
                <PageTitle>My Reviews</PageTitle>
            </PageTitleContainer>
            {reviews.length > 0 ?
                <ContentBox>
                    {reviews.map(review => <ReviewCard 
                        review={review}
                        token={props.token}
                        userData={props.userData}
                        getReviews={getReviews}
                        />)}
                </ContentBox>
                :
                <ContentBoxEmpty>
                    <Blank>
                        <p>You have not written any reviews yet. Start writing your first review now.</p>
                        <Link to={"/create-review"}
                    >
                            <Button>Write a review</Button>
                        </Link>
                    </Blank>
                </ContentBoxEmpty>
            }
        </Container> 
    );
}



const PageTitleContainer = styled.div({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const PageTitle = styled.p({
    textAlign: "center",
    //width: "200px",
    padding: {
        x: "15px",
        y: "15px",
    },
    animationName: {
        from: {
            transform: "translate(-100%, -60px)",

        },
        to: {
            transform: "translate(-100%, 0px)",
        },
    },
    animationDuration: "1s",
    backgroundColor: "#2A2A2A",
    color: "#E1E1E1",
    transform: "translateX(-100%)",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    borderTop: "1px solid #E1E1E1",
});

const Button = styled.button({
    margin: {
        top: "50px",
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


const Blank = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: {
        right: "20%",
        top: "150px",
    },
});

const Container = styled.div({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
});

const ContentBox = styled.div({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    //justifyContent: "flex-start"
});

const ContentBoxEmpty = styled.div({
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
});