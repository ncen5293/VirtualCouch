import React, { Component } from 'react';
import { Transition, Segment } from 'semantic-ui-react';
import '../styles/Home.css';

class ProjectsPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='zoom' duration={500}>
        <Segment raised inverted>
            I graduated from Hunter College on May 2019 and am aspiring to become a software engineer.
            I enjoy playing video games, watching shows, cooking, and biking with friends.
        </Segment>
      </Transition>
    )
  }
}

export default ProjectsPage;
