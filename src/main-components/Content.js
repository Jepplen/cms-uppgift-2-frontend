import React, {useState, useEffect} from "react";

export default function Content(props){
    const [token, setToken] = useState(props.token);

    useEffect(() => {
        setToken(props.token);
    },[props.token]);

    return(
        <div token={props.token}>
            <h1>Main Content</h1>
            {props.children}
        </div>
    );
}


