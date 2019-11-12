import React, { Component } from 'react';
import { Transition, Form, Segment, Header, Message, Icon } from 'semantic-ui-react';
import '../styles/Home.css';

class CommentForm extends Component {
  render() {
    if (this.props.unableToComment) {
      return (
        <Transition visible={true} animation='fly left' duration={500}>
          <Segment raised secondary>
            <Header as='h2' textAlign='center' dividing>
              <Header.Content>Create a Comment<Icon name='comment outline' /></Header.Content>
            </Header>
            <Message negative>
              Unable to submit a comment! Don't leave any field blank!
            </Message>
            <Form onSubmit={this.props.onSubmit}>
              <Form.Input fluid label='Screen Name' placeholder='Screen Name' value={this.props.name} onChange={this.props.onNameChange} />
              <Form.TextArea label='Comment' placeholder='Type your comment here...' value={this.props.comment} onChange={this.props.onCommentChange} />
              <Form.Button content='Submit' />
            </Form>
          </Segment>
        </Transition>
      )
    } else if (this.props.commentSubmitted) {
      return (
        <Transition visible={true} animation='fly left' duration={500}>
          <Segment raised secondary>
            <Header as='h2' textAlign='center' dividing>
              <Header.Content>Create a Comment<Icon name='comment outline' /></Header.Content>
            </Header>
            <Message positive>
              You have submitted a comment!
            </Message>
            <Form onSubmit={this.props.onSubmit}>
              <Form.Input fluid label='Screen Name' placeholder='Screen Name' value={this.props.name} onChange={this.props.onNameChange} />
              <Form.TextArea label='Comment' placeholder='Type your comment here...' value={this.props.comment} onChange={this.props.onCommentChange} />
              <Form.Button content='Submit' />
            </Form>
          </Segment>
        </Transition>
      )
    } else {
      return (
        <Transition visible={true} animation='fly left' duration={500}>
          <Segment raised secondary>
            <Header as='h2' textAlign='center' dividing>
              <Header.Content>Create a Comment<Icon name='comment outline' /></Header.Content>
            </Header>
            <Form onSubmit={this.props.onSubmit}>
              <Form.Input fluid label='Screen Name' placeholder='Screen Name' value={this.props.name} onChange={this.props.onNameChange} />
              <Form.TextArea label='Comment' placeholder='Type your comment here...' value={this.props.comment} onChange={this.props.onCommentChange} />
              <Form.Button content='Submit' />
            </Form>
          </Segment>
        </Transition>
      )
    }
  }
}

export default CommentForm;
