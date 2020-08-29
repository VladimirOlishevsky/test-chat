import React from 'react';
import { Link } from 'react-router-dom';

function LinkRef(props) {
    const { get, obj } = props;

    return (
        <p>
            <Link to='/' onClick={(e) => get(e.target.textContent)}>{obj}</Link>
        </p>

    )
}


export default LinkRef

