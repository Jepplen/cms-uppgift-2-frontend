import react from "react";
import ReviewCard from "./ReviewCard";
import {Link} from "react-router-dom";
import { styled } from '@glitz/react';


export default function MyReviews(props){
    return(
        <>
            <h1>My Reviews</h1>
            
            <ReviewCard />
        </>
    );
}


{/* <Link to="create-review">
                    <p>Create review</p>
            </Link> */}