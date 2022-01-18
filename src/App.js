import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'

import {
  BrowserRouter as Router,
  Routes,
  Route
  
} from "react-router-dom";

export class App extends Component {

  apiKey = process.env.REACT_APP_NEWS_API

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
          <Routes>
          <Route exact path="/"  element={<News key="general" apiKey={this.apiKey} category={"general"}  country={"in"}/>}> </Route>
          <Route exact path="/business"  element={<News key="business" apiKey={this.apiKey} category={"business"}  country={"in"}/>}> </Route>
          <Route exact path="/entertainment"  element={<News key="entertainment" apiKey={this.apiKey} category={"entertainment"}  country={"in"}/>}> </Route>
          <Route exact path="/health"  element={<News key="health" apiKey={this.apiKey} category={"health"}  country={"in"}/>}> </Route>
          <Route exact path="/science"  element={<News key="science" apiKey={this.apiKey} category={"science"}  country={"in"}/>}> </Route>
          <Route exact path="/sports"  element={<News key="sports" apiKey={this.apiKey} category={"sports"}  country={"in"}/>}> </Route>
          <Route exact path="/technology"  element={<News key="technology" apiKey={this.apiKey} category={"technology"}  country={"in"}/>}> </Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

