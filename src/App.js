import './App.css';

import React, {useState}from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
// import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App = ()=>{
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)
    return (
      <div>
        {/* <Router> */}
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)} />
            
          <NavBar />
          {/* <News pageSize={5} country="in" category="sports" /> */}
          <News apiKey={apiKey} setProgress={setProgress} key='general' pageSize={pageSize} country="in" category='general' />
          {/* <Routes> */}
            {/* <Route exact path="/about"><News key='general' pageSize={5} country="in" category="general" /></Route>
            <Route exact path="/business"><News key='business' pageSize={5} country="in" category="business" /></Route>
            <Route exact path="/entertainment"><News key='entertainment' pageSize={5} country="in" category="entertainment" /></Route>
            <Route exact path="/general"><News key='general' pageSize={5} country="in" category="general" /></Route>
            <Route exact path="/health"><News key='health' pageSize={5} country="in" category="health" /></Route>
            <Route exact path="/science"><News key='science' pageSize={5} country="in" category="science" /></Route>
            <Route exact path="/sports"><News key='sports' pageSize={5} country="in" category="sports" /></Route>
            <Route exact path="/technology"><News key='technology' pageSize={5} country="in" category="technology" /></Route> */}

            {/* <Route path='/' element={<News apiKey={apiKey} setProgress={setProgress} key='general' pageSize={pageSize} country="in" category='general' />}></Route> */}
            {/* <Route path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key='business' pageSize={pageSize} country="in" category='business' />}></Route>
            <Route path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key='entertainment' pageSize={pageSize} country="in" category='entertainment' />}></Route>
            <Route path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key='health' pageSize={pageSize} country="in" category='health' />}></Route>
            <Route path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key='science' pageSize={pageSize} country="in" category='science' />}></Route>
            <Route path='/general' element={<News apiKey={apiKey} setProgress={setProgress} key='general' pageSize={pageSize} country="in" category='general' />}></Route>
            <Route path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key='sports' pageSize={pageSize} country="in" category='sports' />}></Route>
            <Route path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key='technology' pageSize={pageSize} country="in" category='technology' />}></Route>

          </Routes>
        </Router> */}
      </div>
    )
}

export default App;