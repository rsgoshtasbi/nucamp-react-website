import React, { Component } from "react";
import DirectoryComponents from "./DirectoryComponents";
import { CAMPSITES } from "../shared/campsites";
import CampsiteInfoComponent from "./CampsiteInfoComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import HeaderComponent from "./HomeComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { COMMENTS } from "../shared/comments";
import { PARTNERS } from "../shared/partners";
import { PROMOTIONS } from "../shared/promotions";
import AboutComponent from "./AboutComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // campsites: CAMPSITES,
  //     // comments: COMMENTS,
  //     // partners: PARTNERS,
  //     // promotions: PROMOTIONS,
  //     showCommentModal: false,
  //   };
  // }

  render() {
    const HomePage = () => {
      return (
        <Home
          campsite={
            this.props.campsites.filter((campsite) => campsite.featured)[0]
          }
          promotion={
            this.props.promotions.filter((promotion) => promotion.featured)[0]
          }
          partner={this.props.partners.filter((partner) => partner.featured)[0]}
        />
      );
    };

    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfoComponent
          campsite={
            this.props.campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
        />
      );
    };

    // week 3: task 1
    const AboutUsPage = () => {
      return <AboutComponent partners={this.props.partners} />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/directory"
            render={() => (
              <DirectoryComponents campsites={this.props.campsites} />
            )}
          />
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          <Route exact path="/aboutus" component={AboutUsPage} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
