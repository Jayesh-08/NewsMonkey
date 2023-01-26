import './App.css';

import React, {useState}from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App = ()=>{
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            height={3}
            progress={progress}
            onLoaderFinished={() => setProgress(0)} />

          <NavBar />
          <Routes>
            <Route path='/' element={<News apiKey={apiKey} setProgress={setProgress} key='top' country="in" category='top' />}></Route>
            <Route path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key='business' country="in" category='business' />}></Route>
            <Route path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} key='entertainment' country="in" category='entertainment' />}></Route>
            <Route path='/environment' element={<News apiKey={apiKey} setProgress={setProgress} key='environment' country="in" category='environment' />}></Route>
            <Route path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key='health' country="in" category='health' />}></Route>
            <Route path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key='science' country="in" category='science' />}></Route>
            <Route path='/world' element={<News apiKey={apiKey} setProgress={setProgress} key='world' country="in" category='world' />}></Route>
            <Route path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key='sports' country="in" category='sports' />}></Route>
            <Route path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key='technology' country="in" category='technology' />}></Route>
            <Route path='/politics' element={<News apiKey={apiKey} setProgress={setProgress} key='politics' country="in" category='politics' />}></Route>
            <Route path='/food' element={<News apiKey={apiKey} setProgress={setProgress} key='food' country="in" category='food' />}></Route>

          </Routes>
        </Router>
      </div>
    )
}

export default App;