import React, {Component} from 'react';
import axios from 'axios';
import {API} from '../../const';

class Leftbar extends Component {
  state = {
    editDescriptionModeEnabled: false,
    editTitleModeEnabled: false,
    title: "",
    description: "",
  };

  upddateCard = (data) => {
    let id = this.props.cardId;
    let url = API + "cards/" + id + "/";
    axios({
      method: 'PATCH',
      url: url,
      headers: {
        "Authorization": 'JWT ' + localStorage.getItem('token'),
      },
      data: data,
    });
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleDescriptionChange = e => {
    this.setState({
      description: e.target.value
    });
  };

  handleEditTitleClick = (e) => {
    e.preventDefault();
    localStorage.getItem('token') ?
        this.setState({editTitleModeEnabled: !this.state.editTitleModeEnabled}) :
        alert("You have to login!")
    ;
  };
  handleEditDescriptionClick = (e) => {
    e.preventDefault();
    localStorage.getItem('token') ?
        this.setState({editDescriptionModeEnabled: !this.state.editDescriptionModeEnabled}) :
        alert("You have to login!")
    ;
  };
  TitleSubmit = e => {
    e.preventDefault();
    this.upddateCard({"title": this.state.title});
    this.setState({editTitleModeEnabled: !this.state.editTitleModeEnabled});
  };
  DescriptionSubmit = e => {
    e.preventDefault();
    this.upddateCard({"description": this.state.description});
    this.setState({editDescriptionModeEnabled: !this.state.editDescriptionModeEnabled});
  };

  render() {
    return (
        <div className="leftbar">
          <div className="card-title">
            <span>Title</span> <a href="" className="edit" onClick={this.handleEditTitleClick}>Edit</a>

            <form onSubmit={this.TitleSubmit}>
              <input defaultValue={this.props.card_data && this.props.card_data.title}
                     disabled={!this.state.editTitleModeEnabled}
                     onChange={this.handleTitleChange}/>
              <button type="submit" className="submit" disabled={!this.state.editTitleModeEnabled}>Save
              </button>
            </form>

          </div>
          <div className="card-description">

            <span>Desription</span> <a href="" className="edit"
                                       onClick={this.handleEditDescriptionClick}>Edit</a>
            <form onSubmit={this.DescriptionSubmit}>
              <input defaultValue={this.props.card_data && this.props.card_data.description}
                     disabled={!this.state.editDescriptionModeEnabled} onChange={this.handleDescriptionChange}/>
              <button type="submit" className="submit" disabled={!this.state.editDescriptionModeEnabled}>Save
              </button>
            </form>
          </div>
        </div>

    );
  }
}

export default Leftbar;
