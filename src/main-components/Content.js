import React from "react";

export default function Content(props){
    // const [, setToken] = useState(props.token);

    // useEffect(() => {
    //     setToken(props.token);
    // },[props.token]);

    return(
        <div>
            {props.children}
        </div>
    );
}


