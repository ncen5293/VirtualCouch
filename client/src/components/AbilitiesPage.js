import React, { Component } from 'react';
import { Header, Icon, Transition, Segment, Statistic, Divider } from 'semantic-ui-react';
import '../styles/Home.css';

class AbilitiesPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='fly up' duration={500}>
        <Segment raised>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='id card outline' circular />
            <Header.Content>Skills</Header.Content>
          </Header>
          <Statistic color='blue'>
            <Statistic.Value>
              C++
            </Statistic.Value>
            <Statistic.Label>4+ Years</Statistic.Label>
          </Statistic>
          <Statistic color='yellow'>
            <Statistic.Value>
              Javascript
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic color='teal'>
            <Statistic.Value>
              React.JS
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic color='green'>
            <Statistic.Value>
              Node.JS
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic color='yellow'>
            <Statistic.Value>
              Python
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic color='orange'>
            <Statistic.Value>
              HTML/CSS
            </Statistic.Value>
            <Statistic.Label>2+ Years</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>
              Git
            </Statistic.Value>
            <Statistic.Label>3+ Years</Statistic.Label>
          </Statistic>
          <Statistic color='green'>
            <Statistic.Value>
              MongoDB
            </Statistic.Value>
            <Statistic.Label>1+ Years</Statistic.Label>
          </Statistic>
          <Statistic color='orange'>
            <Statistic.Value>
              SQL
            </Statistic.Value>
            <Statistic.Label>{'<'}1 Year</Statistic.Label>
          </Statistic>
          <Statistic color='purple'>
            <Statistic.Value>
              C#
            </Statistic.Value>
            <Statistic.Label>{'<'}1 Year</Statistic.Label>
          </Statistic>
          <Divider />
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='book' circular />
            <Header.Content>Education</Header.Content>
          </Header>
          <Statistic color='purple'>
            <Statistic.Value>
              Hunter College
            </Statistic.Value>
            <Statistic.Label>2015-2019 (3.4 GPA)</Statistic.Label>
          </Statistic>
          <Statistic color='blue'>
            <Statistic.Value>
              CUNY Tech Prep
            </Statistic.Value>
            <Statistic.Label>2018-2019</Statistic.Label>
          </Statistic>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='pencil alternate' circular />
            <Header.Content>Work Experience</Header.Content>
          </Header>
          <Statistic color='purple'>
            <Statistic.Value>
              Teaching Assistant @ Hunter College
            </Statistic.Value>
            <br/>
            <Statistic.Label>
              - Assist ~20 students per class in understanding Python and C++ and basic MIPS, Binary, and hexadecimal concepts
            </Statistic.Label>
            <br/>
            <Statistic.Label>
              - Taught 10 students problem solving methods to use throughout their computer science courses per lab hour
            </Statistic.Label>
            <br/>
            <Statistic.Label>2017-2019</Statistic.Label>
          </Statistic>
        </Segment>
      </Transition>
    )

  }
}

export default AbilitiesPage;
