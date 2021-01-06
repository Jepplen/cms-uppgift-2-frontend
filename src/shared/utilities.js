import StarFullIcon from '@material-ui/icons/Star';
import StarEmptyIcon from '@material-ui/icons/StarBorder';

export const getStarRating = (rating) => {
    let starArray = [];
    for (let i = 0; i < rating; i++) {
        starArray.push(<StarFullIcon />);
    } 

    if (rating < 5){
        for (let i = 0; i < (5 - rating); i++) {
            starArray.push(<StarEmptyIcon />)
        }
    }
    return starArray;
};

export const getFormatDate = (date) => {
    let index = date.indexOf("T");
    return date.substring(0, index);
};

export const shortenString = (str, max) => {
    if (str.length < max){
        return str;
    }

    return str.substring(0, max) + "...";
};