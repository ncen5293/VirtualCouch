import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import HomeButtons from './HomeButtons';
import AbilitiesPage from './AbilitiesPage';
import ProjectsPage from './ProjectsPage';
import HobbiesPage from './HobbiesPage';
import Statement from './Statement';
import NavBar from './NavBar';
import profilepicture from '../images/profilepic2.0.png';
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleProjectButton: false,
      visibleAbilitiesButton: false,
      visibleHobbiesButton: false,
      buttonClicked: false,
      visibleProjectsPage: false,
      visibleAbilitiesPage: false,
      visibleHobbiesPage: false,
      isMenuOpen: false,
      menuChanging: false,
      visibleProjectModalButton: false,
      visibleAbilitiesModalButton: false,
      visibleHobbiesModalButton: false,
      visibleMenu: false,
      onePagePortfolio: false
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.toggleButtonVisibility = this.toggleButtonVisibility.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount = () => {
    if (localStorage.getItem('redirect') === 'projects') {
      this.setState(prevState => ({
          visibleProjectsPage: true,
          visibleHobbiesPage: false,
          visibleAbilitiesPage: false,
          visibleMenu: true
        }));
    } else if (localStorage.getItem('redirect') === 'abilities') {
      this.setState(prevState => ({
          visibleProjectsPage: false,
          visibleHobbiesPage: false,
          visibleAbilitiesPage: true,
          visibleMenu: true
        }));
    } else if (localStorage.getItem('redirect') === 'hobbies') {
      this.setState(prevState => ({
          visibleProjectsPage: false,
          visibleHobbiesPage: true,
          visibleAbilitiesPage: false,
          visibleMenu: true
        }));
    } else {
      this.toggleButtonVisibility();
    }
    localStorage.setItem('redirect', 'portfolio');
  }

  allPagesClosed = () => {
    const visibleProjectsPage = this.state.visibleProjectsPage;
    const visibleAbilitiesPage = this.state.visibleAbilitiesPage;
    const visibleHobbiesPage = this.state.visibleHobbiesPage;
    console.log(visibleProjectsPage, visibleAbilitiesPage, visibleHobbiesPage);
    if (!visibleProjectsPage && !visibleAbilitiesPage && !visibleHobbiesPage) {
      console.log('true')
      return true;
    } else {
      return false;
    }
  }

  onButtonClick = (type) => {
    this.toggleButtonVisibility();
    if (!this.changePage(type)) {
      this.toggleButtonVisibility();
    }
  }

  toggleButtonVisibility = () => {
    if (!this.state.buttonClicked) {
      this.setState(prevState => ({ visibleProjectButton: !prevState.visibleProjectButton, buttonClicked: !prevState.buttonClicked }));
      window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesButton: !prevState.visibleHobbiesButton }));}, 100);
      window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesButton: !prevState.visibleAbilitiesButton }));}, 200);
      window.setTimeout(() => {this.setState(prevState => ({ buttonClicked: !prevState.buttonClicked }));}, 700);
    }
  }

  changePage = (type) => {
    if (type === 'My Projects') {
      if (this.state.onePagePortfolio) {
        scrollToComponent(this.projects, { offset: 0, align: 'top', duration: 1000})
      } else {
        window.setTimeout(() => {this.setState(prevState => ({
            visibleProjectsPage: !prevState.visibleProjectsPage,
            visibleHobbiesPage: false,
            visibleAbilitiesPage: false,
            visibleMenu: true
          }));
          if (this.allPagesClosed()) {
            this.setState({visibleMenu: false});
            this.toggleButtonVisibility();
          }
        }, 700);
      }
      return true;
    } else if (type === 'My Hobbies') {
      if (this.state.onePagePortfolio) {
        scrollToComponent(this.hobbies, { offset: 0, align: 'top', duration: 1000})
      } else {
        window.setTimeout(() => {this.setState(prevState => ({
            visibleHobbiesPage: !prevState.visibleHobbiesPage,
            visibleProjectsPage: false,
            visibleAbilitiesPage: false,
            visibleMenu: true
          }));
          if (this.allPagesClosed()) {
            this.setState({visibleMenu: false});
            this.toggleButtonVisibility();
          }
        }, 700);
      }
      return true;
    } else if (type === 'My Abilities') {
      if (this.state.onePagePortfolio) {
        scrollToComponent(this.abilities, { offset: 0, align: 'top', duration: 1000})
      } else {
        window.setTimeout(() => {this.setState(prevState => ({
            visibleAbilitiesPage: !prevState.visibleAbilitiesPage,
            visibleHobbiesPage: false,
            visibleProjectsPage: false,
            visibleMenu: true
          }));
          if (this.allPagesClosed()) {
            this.setState({visibleMenu: false});
            this.toggleButtonVisibility();
          }
        }, 700);
      }
      return true;
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
    if (this.state.isMenuOpen && !this.state.menuChanging) {
      this.setState({ menuChanging: true });
      this.changePage(type);
      window.setTimeout(() => {this.setState(prevState => ({ visibleProjectModalButton: !prevState.visibleProjectModalButton }));}, 50);
      window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesModalButton: !prevState.visibleAbilitiesModalButton }));}, 125);
      window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesModalButton: !prevState.visibleHobbiesModalButton }));}, 200);
      window.setTimeout(() => {this.setState({ isMenuOpen: false, menuChanging: false });}, 700);
    } else if (!this.state.isMenuOpen && !this.state.menuChanging) {
      this.setState({ isMenuOpen: true, menuChanging: true });
      window.setTimeout(() => {this.setState(prevState => ({ visibleProjectModalButton: !prevState.visibleProjectModalButton }));}, 50);
      window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesModalButton: !prevState.visibleAbilitiesModalButton }));}, 125);
      window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesModalButton: !prevState.visibleHobbiesModalButton }));}, 200);
      window.setTimeout(() => {this.setState({ menuChanging: false });}, 700);
    }
  }

  onMenuButtonClick = (type) => {
    this.onMenuToggle(type);
  }

  handlePageChange = () => {
    this.setState(prevState => ({ onePagePortfolio: !prevState.onePagePortfolio }));
  }

  render() {
    const onePagePortfolio = this.state.onePagePortfolio;
    const visibleProjectButton = onePagePortfolio ? !onePagePortfolio : this.state.visibleProjectButton;
    const visibleAbilitiesButton = onePagePortfolio ? !onePagePortfolio : this.state.visibleAbilitiesButton;
    const visibleHobbiesButton = onePagePortfolio ? !onePagePortfolio : this.state.visibleHobbiesButton;
    const visibleProjectsPage = onePagePortfolio ? onePagePortfolio : this.state.visibleProjectsPage;
    const visibleAbilitiesPage = onePagePortfolio ? onePagePortfolio : this.state.visibleAbilitiesPage;
    const visibleHobbiesPage = onePagePortfolio ? onePagePortfolio : this.state.visibleHobbiesPage;
    const visibleProjectModalButton = this.state.visibleProjectModalButton;
    const visibleAbilitiesModalButton = this.state.visibleAbilitiesModalButton;
    const visibleHobbiesModalButton = this.state.visibleHobbiesModalButton;
    const visibleMenu = onePagePortfolio ? onePagePortfolio : this.state.visibleMenu;
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
          onePagePortfolio={onePagePortfolio}
          handlePageChange={this.handlePageChange}
          page='home'
        />
        <Statement
          visible={onePagePortfolio ? onePagePortfolio : visibleProjectButton}
        />
        <div className='home-buttons'>
          <img src={profilepicture} alt='profile' className='profile-pic' />
          <HomeButtons
            visibleButton={visibleProjectButton}
            onButtonClick={this.onButtonClick}
            leftButton='My Projects'
            rightButton='Portfolio Page'
            position='top'
          />
          <HomeButtons
            visibleButton={visibleAbilitiesButton}
            onButtonClick={this.onButtonClick}
            leftButton='My Hobbies'
            rightButton='Watch Together'
            position='middle'
          />
          <HomeButtons
            visibleButton={visibleHobbiesButton}
            onButtonClick={this.onButtonClick}
            leftButton='My Abilities'
            rightButton='Comments Page'
            position='bottom'
          />
        </div>
        <ProjectsPage
          visible={visibleProjectsPage}
          ref={(section) => { this.projects = section }}
        />
        <AbilitiesPage
          visible={visibleAbilitiesPage}
          ref={(section) => { this.abilities = section }}
        />
        <HobbiesPage
          visible={visibleHobbiesPage}
          ref={(section) => { this.hobbies = section }}
        />
      </div>
    )
  }
}

export default Home;
