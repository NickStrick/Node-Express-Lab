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
      console.log(response)
      this.setState(() => ({posts: response.data}));
    })
    .catch(err => console.log(err));

  }

  render() { console.log(this.state.posts)
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
