import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import '../styles/Watch.css';

class Searchbar extends Component {
  render() {
    return (
      <Input
        placeholder='search for videos...'
        style={{width: '90%'}}
        onChange={this.props.onChange}
        onKeyPress={this.props.onKeyPress}
        value={this.props.value}
      />
    )
  }
}

export default Searchbar;
