import React from 'react';
import axios from 'axios';
import Form from '../Form';
import { Redirect } from 'react-router-dom'

class Item extends React.Component {
  state = { menu_item: {}, edit: false, id: null }

  componentDidMount() {
    axios.get(`/api/menus/${this.props.match.params.id}`)
    .then( res => this.setState({ menu_item: res.data }) )
  }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !this.state.edit, id: null }
    });
  }

  submit = (menu) => {
    axios.put(`/api/menus/${this.props.match.params.id}`, { menu })
    .then( res => this.setState({ menu_item: res.data, edit: false }) );
  }

  show() {
    let { menu_item: { name, description, price }} = this.state;
    return (
      <div>
      <h1>{name}</h1>
      <h3>{description}</h3>
      <h3>{price}</h3>
      </div>
    )
  }

  edit() {
    return <Form {...this.state.menu_item} submit={this.submit} />
  }

  destroy = () => {
    axios.delete(`/api/menus/${this.props.match.params.id}`)
      .then( () => this.props.history.push('/') )
  }

  render() {
    let { edit, id } = this.state;
    return (
      <div>
      { id && <Redirect to={{ pathname: '/', state: { id }}} /> }
      { edit ? this.edit() : this.show() }
      <button onClick={this.toggleEdit}>{ edit ? 'Cancel' : 'Edit' }</button>
      <button onClick={this.destroy}>Destroy</button>
      </div>
    )
  }
}

export default Item;
