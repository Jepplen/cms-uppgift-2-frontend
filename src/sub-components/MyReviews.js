import react,{useState, useEffect} from "react";
import ReviewCard from "./ReviewCard";
import {Link, Redirect} from "react-router-dom";
import { styled } from '@glitz/react';
import axios from "axios";
import CookieService from "../services/CookieService";


export default function MyReviews(props){
    //const [reviewIds, setReviewIds] = useState([]);
    const [reviews, setReviews] = useState([]);



    useEffect(() => {
        const config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };

        console.log(props.token);
        console.log(props.userData.profileId);
        axios.get(`/profiles/${props.userData.profileId}`, config
        ).then(response => {
            console.log("HERE 2")
            setReviews(response.data.reviews);
        }).catch(err => {
            console.error(err);
        });
    },[]);


    if (!props.isAuthed){
        return <Redirect to="/" />
    }

    if(!reviews){
        return <div />
    }
    

    return(
        <Container>
            <h1>My Reviews</h1>
            <ContentBox>
            {reviews.length < 1 ?
                <p>You have not written any review yet. Start writing your first now <Link to={"/create-review"}>Create review</Link></p>
            :
                reviews.map(review => <ReviewCard review={review} token={props.token} userData={props.userData} />)
            }
        </ContentBox>
        </Container> 
    );
}
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

{/* <Link to="create-review">
                    <p>Create review</p>
            </Link> */}