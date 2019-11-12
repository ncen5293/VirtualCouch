import React, { Component } from 'react';
import { Card, Button, Label, Image } from 'semantic-ui-react';
import axios from 'axios';
import LikeModal from './LikeModal';
import '../styles/Home.css';

class HobbiesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCounter: '-',
      isLikeModalOpen: false
    }
  }

  componentDidMount = () => {
    console.log(`get backend likes for ${this.props.title}`);
    axios.get(`/portfolio/hobbys/${this.props.title}/like`, {params: { title: this.props.title }})
      .then(res => {
        this.setState({ likeCounter: res.data.likes });
      })
      .catch(error => {
        console.error(error)
      })
  }

  onLikeClick = (title) => {
    console.log(`I liked ${title}`);
    if (localStorage.getItem(`${this.props.title}`) !== 'liked') {
      axios.put(`/portfolio/hobbys/${this.props.title}/like`, {
          title: this.props.title,
          likeCounter: this.state.likeCounter
        })
        .then(res => {
          console.log(res.data);
          if (res.data.likes) {
            this.setState({ likeCounter: res.data.likes });
            this.onMenuToggle();
            localStorage.setItem(`${this.props.title}`, 'liked');
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  onMenuToggle = () => {
    this.setState(prevState => ({ isLikeModalOpen: !prevState.isLikeModalOpen }));
    window.setTimeout(() => {this.setState(prevState => ({ isLikeModalOpen: !prevState.isLikeModalOpen }));}, 1250);
  }

  render() {
    let canLike = localStorage.getItem(`${this.props.title}`) !== 'liked';
    return (
      <Card raised color={this.props.cardColor}>
        <Image src={this.props.logo} wrapped ui={false} />
        <Card.Content>
          <Button
            circular
            disabled={!canLike}
            icon='thumbs up outline'
            color={this.props.cardColor}
            onClick={() => this.onLikeClick(this.props.title)}
          />
          <LikeModal
            open={this.state.isLikeModalOpen}
            onMenuToggle={this.onMenuToggle}
            title={this.props.title}
            likePopup={this.props.likePopup}
          />
          <Label basic pointing='left'>
            {this.state.likeCounter}
          </Label>
          <Card.Meta>{this.props.genre}</Card.Meta>
          <Card.Description>
            {this.props.desc}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            {this.props.mentions}
          </p>
        </Card.Content>
      </Card>
    )

  }
}

export default HobbiesCard;
