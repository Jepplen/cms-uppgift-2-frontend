import React, {useState, useEffect} from "react";
import {styled} from "@glitz/react";
import axios from "axios";

export default function GamePage(props){
    const [game, setGame] = useState(null);
    console.log(props);

    useEffect(() => {
        getGame();
    },[]);

    function getGame(){
        axios.get(`/games/${props.location.state.game.id}`
        ).then((response) => {
            console.log(response);
            setGame(response.data);
        }).catch((err) => {
            console.error(err);
        });
    }

    console.log(game);

    if (!game){
        return <div></div>;
    }

    return(
        <GameContainer>
            <p>GamePage</p>
            <p>{game.title}</p>
            {game.reviews.map(review => <p key={review.id + review.title}>{review.title}</p>)}
        </GameContainer>
    );
}


const GameContainer = styled.div({
    
});