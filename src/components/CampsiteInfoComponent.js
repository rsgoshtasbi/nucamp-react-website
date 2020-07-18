import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { LocalForm, Control } from "react-redux-form";

import { Link } from "react-router-dom";

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCommentModal: false,
    };
  }

  handleCommentModal = () => {
    this.setState({
      showCommentModal: !this.state.showCommentModal,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.handleCommentModal}>
          <i className="fa fa-pencil fa-lg" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.showCommentModal} toggle={this.handleCommentModal}>
          <ModalHeader toggle={this.handleCommentModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm
              onUpdate={(form) => this.handleUpdate(form)}
              onChange={(values) => this.handleChange(values)}
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Control.select className="col-12" model="rating" id="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Control.select>
            </LocalForm>
            <Button type="submit" value="submit" color="primary">
              Submit
            </Button>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderCampsite({ campsite }) {
  if (campsite) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  return <div />;
}

function RenderComments({ comments, showCommentModal, handleCommentModal }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div>
              <p>{comment.text}</p>
              <p>
                {comment.author}{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm
          showCommentModal={showCommentModal}
          handleCommentModal={handleCommentModal}
        />
      </div>
    );
  }
  return <div></div>;
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>

        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
