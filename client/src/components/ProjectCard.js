import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import '../styles/Home.css';

class ProjectCard extends Component {
  render() {
    return (
      <Card raised color={this.props.cardColor}>
        <Card.Content>
          <Card.Header>
            <a href={this.props.link}>{this.props.title}</a>
          </Card.Header>
          <Card.Meta>{this.props.timeWorked}</Card.Meta>
          <Card.Description>
            {this.props.desc}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            {this.props.stack}
          </p>
        </Card.Content>
      </Card>
    )
  }
}

export default ProjectCard;
