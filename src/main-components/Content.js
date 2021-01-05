import React from "react";

export default function Content(props){
    // const [, setToken] = useState(props.token);

    // useEffect(() => {
    //     setToken(props.token);
    // },[props.token]);

    return(
        <div>
            <h1>Main Content</h1>
            {props.children}
        </div>
    );
}


