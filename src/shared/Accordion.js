import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import { styled } from '@glitz/react';



export default function CustomizedAccordions(props) {
    console.log(props);
  const [expanded, setExpanded] = useState("");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
        {props.genres.map(genre => 
            <Accordion 
                key={genre.genre_name + genre.id} 
                square expanded={expanded === genre.genre_name} 
                onChange={handleChange(genre.genre_name)}>
            <AccordionSummary 
                aria-controls={genre.genre_name + "-content"} 
                id={genre.genre_name + "-header"}>
              <Typography>{genre.genre_name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {genre.games.map(game =>
                    <Link                         
                        key={game.title + game.id}
                        to={{            
                            pathname: "/game",
                            state: { game: game }
                        }}                    
                    >
                        <GameButton><span style={{paddingLeft: "30px"}}>{game.title}</span></GameButton>
                    </Link>
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )}
    </div>
  );
}


const GameButton = styled.button({

  textAlign: "left",

    margin: {
        top: "0px",
    },
    width: "100%",
    height: "25px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "black",
    border: "none",
    borderRadius: "2px",
    outline: "none",
    ':hover': {
        backgroundColor: "#9100ff",
        color: "white",
    },
    ':active': {
        backgroundColor: "#550095",
        color: "white",
    },

});


const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 45,
      '&$expanded': {
        minHeight: 45,
      },
     
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);
  
  const AccordionDetails = withStyles((theme) => ({
    root: {
      display: "flex",
      alignItems: "flex-start",
      padding: "0",
      width: "100%",
      boxSizing: "border-box",
    },
  }))(MuiAccordionDetails);