import React from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, InputGroup, InputGroupAddon, InputGroupText, Input 
} from 'reactstrap';


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      followers: [],
      search: 'cybersck',
      searchResult: true
    }

  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/${this.state.search}`)
    .then(res => {
      this.setState({'user': res.data})
      this.setState({'searchResult': true})

    })
    .catch(err => {
      console.log(err)
      this.setState({'searchResult': false})
    });
    axios.get(`https://api.github.com/users/${this.state.search}/followers`)
    .then(res => {
      this.setState({'followers': res.data})
      this.setState({'searchResult': true})

    })
    .catch(err => {
      console.log(err)
      this.setState({'searchResult': false})
    });
    
  }

  setSearch = (e) => {
    this.setState({'search': e.target.value});
  }

  search = (e) => {
    e.preventDefault();

    axios.get(`https://api.github.com/users/${this.state.search}`)
    .then(res => {
      this.setState({'user': res.data})
      this.setState({'searchResult': true})
      this.forceUpdate();
      console.log(this.state)
    })
    .catch(err => {
      console.log(err)
      this.setState({'searchResult': false})
      this.forceUpdate();
    });
    axios.get(`https://api.github.com/users/${this.state.search}/followers`)
    .then(res => {
      this.setState({'followers': res.data})
      this.setState({'searchResult': true})
      this.forceUpdate();
      console.log(this.state)
    })
    .catch(err => {
      console.log(err)
      this.setState({'searchResult': false})
      this.forceUpdate();
    });
    e.target.elements[0].value = '';
  }

  
  render() {
    return(
      <div className='github'>
      <form onSubmit={this.search}>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>@</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="username" onChange={this.setSearch}/>
      </InputGroup>
      <button className='btn btn-primary' type='submit'>Search</button>
      </form>
      {this.state.searchResult === false && <h1>No such user found...please try searching again!</h1>}

      {this.state.user !== null | undefined &&
      <Card className='user'>
        <CardImg src={this.state.user.avatar_url} alt="Card image cap" />
        <CardBody className='card-body'>
          <CardTitle className='user-title'>{this.state.user.login}</CardTitle>
          <CardSubtitle>{this.state.user.followers} Followers</CardSubtitle>
          <CardText>{this.state.user.bio}</CardText>
        </CardBody>
      </Card>
      }

      { this.state.followers !== null | undefined &&
      this.state.followers.map(i => (
      <Card className='follower'>
        <CardImg src={i.avatar_url} alt="Card image cap" />
        <CardBody className='card-body'>
          <CardTitle className='user-title'>{i.login}</CardTitle>
        </CardBody>
      </Card>
      ))
      }

      {this.state.followers.length === 0 && <h1>User Has no followers to display</h1>}
      </div>
    )
  }


}



export default App;
