import React, { Component } from 'react';
import { Header, Icon, Transition, Segment, Card } from 'semantic-ui-react';
import ProjectCard from './ProjectCard';
import '../styles/Home.css';

class ProjectsPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='fly down' duration={500}>
        <Segment raised>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='file code outline' circular />
            <Header.Content>Projects</Header.Content>
          </Header>
          <Card.Group itemsPerRow={2}>
            <ProjectCard
              title='Mock Stock Portfolio'
              timeWorked='Summer 2019'
              desc='A Full-stack web application that enables a user to sign up for a starting bank of $5000 to buy and sell mock stocks from the IEX API to see how well they can do'
              stack='React.Js, Node.Js, MongoDB, javascript, HTML, CSS'
              link='https://github.com/ncen5293/StockPortfolioApplication'
            />
            <ProjectCard
              title='Titanic Passengers'
              timeWorked='Summer 2019'
              desc='A Full-stack web application that lets the user retrieve information on all passengers who were on the titanic'
              stack='React.Js, Node.Js, MongoDB, Docker, javascript, HTML, CSS'
              link='https://github.com/ncen5293/StockPortfolioApplication'
            />
            <ProjectCard
              title='EscapeNLP'
              timeWorked='Spring 2019'
              desc='A Full-stack web application that enables up to five users play a text-based escape room using the natural language interpreter for free form actions via the text chat'
              stack='React.Js, Node.Js, Socket.Io, NLP.JS, javascript, HTML, CSS'
              link='https://github.com/MariaVolpe/EscapeNLP'
            />
            <ProjectCard
              title='Ibenta'
              timeWorked='Fall 2018'
              desc='A Full-stack web application that enables users sign-up, login, post items, and search for items so that they can buy and sell items locally'
              stack='React.Js, Node.Js, PostgreSQL, Firebase, javascript, HTML, CSS'
              link='https://github.com/cvargas9717/Ibenta-app'
            />
            <ProjectCard
              title='notKirby'
              timeWorked='Summer 2018'
              desc='A short 2D game made in Unity and lets the player move, attack, get attacked, get items'
              stack='C#, Unity2D'
              link='https://github.com/ncen5293/notKirbyGame'
            />
            <ProjectCard
              title='AD Knowledge Base'
              timeWorked='Spring 2018'
              desc='To retrieve information of a Alzheimer Disease Knowledge Database using noSQL databases'
              stack='Python, MongoDB, Neo4J, CassandraDB'
              link='https://github.com/calvinqh/ad_knowledge_base'
            />
            <ProjectCard
              title='OS CMD Simulation'
              timeWorked='Spring 2018'
              desc='Stimulates how an operating system runs. It has memory management, disk management, and a multilevel scheduling queue for processes to be used in a single core CPU.'
              stack='C++'
              link='https://github.com/ncen5293/OS-Project'
            />
          </Card.Group>
        </Segment>
      </Transition>
    )
  }
}

export default ProjectsPage;
