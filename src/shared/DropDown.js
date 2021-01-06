import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [game, setGame] = useState(props.currentGame ? props.currentGame : "");
  //const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    let gameId = e.target.value;
    if (props.currentGame && !e.target.value){
      gameId = props.currentGame;
    }


    //const gameId = e.target.value;
    setGame(gameId);
    let game = props.data.filter(item => item.id === gameId);
    props.updateValue(game[0]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        {props.header}
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{props.category}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={game}
          onChange={handleChange}
          required
        >
          <MenuItem value="">
            <em>{props.currentGame ? "Current game" : "None"}</em>
          </MenuItem>
          {props.data.map(content => {
              return(
                    <MenuItem 
                        key={content.id + content.title}
                        value={content.id}
                    >
                            {content.title}
                    </MenuItem>
              );
          })}
        </Select>
      </FormControl>
    </div>
  );
}