import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount(){
    axios.get('http://localhost:5000/api/posts')
    .then(response => {
      this.setState(() => ({posts: response}));
    })
    .catch(err => console.log(err));

  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => (
          <div>
            <h1>Card# {post.id}</h1>
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
