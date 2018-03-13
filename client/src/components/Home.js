import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Form from '../Form'


class Home extends React.Component {
  state = { menu_items: [], showForm: false }

  componentDidMount() {
    axios.get('/api/menus')
    .then( res => this.setState({ menu_items: res.data }) )
  }

  form() {
    return <Form submit={this.submit}/>
  }


  submit = (menu) => {
    let { menu_items } = this.state
    axios.post('/api/menus', { menu })
    .then( res => this.setState({ menu_items: [res.data, ...menu_items ], showForm: false }) )
  }

  toggleForm = () => {
    this.setState( state => {
      return { showForm: !state.showForm }
    }
  )}

  show() {
    let { menu_items } = this.state;
    return (
      <ul>
      { menu_items.map( i =>
        <li key={i.id}>
        <Link to={`/Items/${i.id}`}>{i.name}</Link>
        </li>
      )
    }
    </ul>
  )
}

render() {
  let { showForm } = this.state;
  return (
    <div>
    <h2>Products</h2>
    <button onClick={this.toggleForm}>{ showForm ? 'Hide' : 'Show' } form</button>
    { showForm ? this.form() : this.show() }


    </div>
  )
}
}

export default Home;
