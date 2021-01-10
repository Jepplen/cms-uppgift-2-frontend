import StarFullIcon from '@material-ui/icons/Star';
import StarEmptyIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export const getStarRating = (rating) => {
    let starArray = [];
    for (let i = 0; i < rating; i++) {
        starArray.push(<StarFullIcon key={Math.random()}/>);
    } 

    if (rating < 5){
        for (let i = 0; i < (5 - rating); i++) {
            starArray.push(<StarEmptyIcon key={Math.random()}/>)
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

export const getAverageStarRating = (reviews) => {
    let avg = 0;

    for (let i = 0; i < reviews.length; i++) {
        avg += reviews[i].rating;
    } 

    avg = avg / reviews.length;
    avg = Math.round(avg * 10) / 10;

    //let avg = reviews.reduce((a, b) => (a.rating + b.rating)) / reviews.length;
    let floorInt = Math.floor(avg);
    const rest = avg - floorInt;
    let starArray = [];

    for (let i = 0; i < floorInt; i++) {
        starArray.push(<StarFullIcon key={Math.random()}/>);
    } 

    if (rest > 0 && rest < 0.5) {
        starArray.push(<StarEmptyIcon key={Math.random()}/>)
    } else if (rest >= 0.5 && rest < 1){
        starArray.push(<StarHalfIcon key={Math.random()}/>);
    } else {
        // Do nothing
    }

    const emptySpaces = starArray.length;

    if (emptySpaces < 5){
        for (let i = 0; i < (5 - emptySpaces); i++) {
            starArray.push(<StarEmptyIcon key={Math.random()}/>)
        }
    }

    const result = {rating: starArray, average: avg};
    return result;
};