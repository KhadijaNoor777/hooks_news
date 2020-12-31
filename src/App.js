import React, {useState, useEffect, useRef} from 'react';
import './App.css'
import axios from 'axios';
import Results from './Results';

function App() {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const searchInputRef = useRef();               //used for setting reference to html element

  useEffect(() => {
    getResults();
        //  .then(response => {
        //    console.log(response.data);
        //    setResults(response.data.hits)
        //  })
  }, [])

  const getResults = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`)
      setResults(response.data.hits)
    }
    catch(err){
      setError(err)
    }
    setLoading(false);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getResults();
  }

  const handleClear = (e) => {
    setQuery("");
    searchInputRef.current.focus();
  }

  return (
    <div className="App" style={{paddingLeft: '20px'}}>

      <h1 style={{color: 'rgb(58, 58, 58)'}}>Search News</h1>
      <form onSubmit={handleSearch}>
        <input type='text' onChange={(e) => setQuery(e.target.value)} value={query} ref={searchInputRef} 
               style={{width:'200px' , height:'20px', borderRadius:'3px'}}>
        </input>
        <button type='submit' 
                style={{margin:'5px' , background:'orange' , height:'25px', borderRadius:'3px'}}>
                <b>Search</b>
        </button>
        <button type='button' onClick={handleClear} 
                style={{ background:'rgb(77, 209, 209)', color:'white', height:'25px', borderRadius:'3px'}}>
                <b>Clear</b>
        </button>
      </form>


      { loading ? ( <div style={msgStyle}><b>Loading Results...</b></div> ) : ( <Results results={results} /> )}
      {/* <ul>
      
        {results.map((result) => {
          
          <li key={result.objectID}>
          
            <h2><a href={result.url}>{result.title}</a></h2>
            {console.log(result.title)}
          </li>
        })}
      </ul> */}
      {error && <div style={msgStyle}><b>{error.message}</b></div>}
    </div>
  );
}

const msgStyle = {
  margin: '20px',
  fontSize: '20px'
}

export default App;
