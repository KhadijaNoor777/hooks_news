import React from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';

export default function Results({results}) {
    return (
        <Router>
            <div>
                {/* <h1>Results</h1> */}
                <br/><br/>
                {results.map((result) =>
                    <Link style={{fontSize:'20px', color:'black'}}>{result.title}<br/></Link>
                    
                )}
                {/* <ul>
        
                    {results.map((result) => {
                    
                    <li key={result.objectID}>
                    
                        <h2><a href={result.url}>{result.title}</a></h2>
                        {console.log(result.title)}
                    </li>
                    })}
                </ul> */}
            </div>
        </Router>
    )
}

