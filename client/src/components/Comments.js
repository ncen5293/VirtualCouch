import React, { Component } from 'react';
import { Transition, Segment, Header, Icon, Card } from 'semantic-ui-react';
import '../styles/Home.css';

class Comments extends Component {
  render() {
    let comments = [];
    if (this.props.comments.length === 0) {
      comments = (<Header as='h4' icon textAlign='center'>
                    <Icon name='frown outline' />
                    <Header.Content>Nothing appears to be here</Header.Content>
                  </Header>);
    } else {
      comments = this.props.comments.map((comment, i) => {
        return (<Card raised key={i} >
                  <Card.Content>
                    <Card.Header>
                      {comment.Name}
                    </Card.Header>
                    <Card.Meta>{new Date(comment.Date).toUTCString()}</Card.Meta>
                    <Card.Description>
                      {comment.Comment}
                    </Card.Description>
                  </Card.Content>
                </Card>);
      });
      comments = <Card.Group>{comments}</Card.Group>
    }
    return (
      <Transition visible={true} animation='fly left' duration={500}>
        <Segment raised>
          <Header as='h2' textAlign='center' dividing>
            <Header.Content>Comments</Header.Content>
          </Header>
          {comments}
        </Segment>
      </Transition>
    )
  }
}

export default Comments;
