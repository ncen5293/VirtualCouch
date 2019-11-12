import React, { Component } from 'react';
import axios from 'axios';
import Statement from './Statement';
import CommentForm from './CommentForm';
import Comments from './Comments';
import NavBar from './NavBar';
import '../styles/Home.css';

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      name: '',
      comment: '',
      commentSubmitted: false,
      unableToComment: false
    }
  }

  componentDidMount = async () => {
    await this.getComments();
  }

  changePage = (type) => {
    if (type === 'My Projects') {
      localStorage.setItem('redirect', 'projects');
      this.props.history.push('/');
    } else if (type === 'My Hobbies') {
      localStorage.setItem('redirect', 'hobbies');
      this.props.history.push('/');
    } else if (type === 'My Abilities') {
      localStorage.setItem('redirect', 'abilities');
      this.props.history.push('/');
    } else if (type === 'Comments Page') {
      this.props.history.push('/comments');
    } else if (type === 'Portfolio Page') {
      this.props.history.push('/');
    } else if (type === 'Watch Together') {
      this.props.history.push('/watch');
    } else {
      return false;
    }
  }

  onMenuToggle = (type) => {
    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
    this.changePage(type);
  }

  onMenuButtonClick = (type) => {
    this.onMenuToggle(type);
  }

  getComments = async () => {
    await axios.get('/portfolio/comments')
      .then(res => {
        console.log(res.data);
        this.setState({ comments: res.data.comments });
      })
      .catch(error => {
        console.error(error)
      })
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  }

  onCommentChange = (event) => {
    this.setState({comment: event.target.value});
  }

  submitComment = (event) => {
    const name = this.state.name;
    const comment = this.state.comment;
    if (name.length === 0 || comment.length === 0) {
      this.setState({ unableToComment: true, commentSubmitted: false });
    } else {
      axios.post('/portfolio/comments',
        {
          name: this.state.name,
          comment: this.state.comment
        })
        .then(res => {
          this.setState({ comment: '', name: '', unableToComment: false, commentSubmitted: true });
          console.log(this.state.commentSubmitted);
          this.getComments();
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  render() {
    const visibleProjectModalButton = this.state.visibleProjectModalButton;
    const visibleAbilitiesModalButton = this.state.visibleAbilitiesModalButton;
    const visibleHobbiesModalButton = this.state.visibleHobbiesModalButton;
    const visibleMenu = this.state.visibleMenu;
    const comments = this.state.comments;
    return (
      <div className='App-header'>
        <NavBar
          visibleMenu={visibleMenu}
          onMenuToggle={this.onMenuToggle}
          isMenuOpen={this.state.isMenuOpen}
          visibleProjectModalButton={visibleProjectModalButton}
          visibleAbilitiesModalButton={visibleAbilitiesModalButton}
          visibleHobbiesModalButton={visibleHobbiesModalButton}
          onMenuButtonClick={this.onMenuButtonClick}
          page='comments'
        />
        <Statement
          visible={true}
        />
        <CommentForm
          onSubmit={this.submitComment}
          onNameChange={this.onNameChange}
          onCommentChange={this.onCommentChange}
          name={this.state.name}
          comment={this.state.comment}
          commentSubmitted={this.state.commentSubmitted}
          unableToComment={this.state.unableToComment}
        />
        <Comments comments={comments} />
      </div>
    )
  }
}

export default CommentsPage;
