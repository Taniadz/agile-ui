import React, {Component} from 'react';
import axios from 'axios';
import {API} from '../../const';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
import * as moment from 'moment';

const status_options = [
  {value: 'TO DO', label: 'TO DO'},
  {value: 'IN PROGRESS', label: 'IN PROGRESS'},
  {value: 'DONE', label: 'DONE'},
];

class Rightbar extends Component {
  state = {
    selectedStatus: null,
    selectedSubscribed: null,
    loadCompleteStatus: "",
    checkStatus: "",
    displayStatus: false,
    loadCompleteSubcribed: "",
    checkSubcribed: "",
    displaySubcribed: false,
    date: "",
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
    })
        .then(
            res => {
              if (data.status) {
                this.setState({loadCompleteStatus: "load-complete", checkStatus: "show"});
              } else {
                this.setState({loadCompleteSubcribed: "load-complete", checkSubcribed: "show"});
              }
            });
  };

  SelectStatusChange = selectedStatus => {
    if (localStorage.getItem('token')) {
      this.setState({displayStatus: "display", loadCompleteStatus: "", checkStatus: ""});
      this.setState({selectedStatus});
      this.upddateCard({"status": selectedStatus.value});
    } else {
      alert("You have to login!")
    }
  };
  SelectSubsribedChange = selectedSubscribed => {
    if (localStorage.getItem('token')) {
      this.setState({displaySubcribed: "display", loadCompleteSubcribed: "", checkSubcribed: ""});
      this.setState({selectedSubscribed});
      this.upddateCard({"subsribed_id": selectedSubscribed.value});
    } else {
      alert("You have to login!")
    }
  };
  onDateChange = date => {
        if (localStorage.getItem('token')) {
          this.setState({date});
          let date_moment = moment(date).format('YYYY-MM-DD HH:mm');
          this.upddateCard({"time_to": date_moment});
        }else {
      alert("You have to login!")
    }

  };

  render() {
    const {selectedStatus} = this.state;
    const {selectedSubscribed} = this.state;

    const options = this.props.user_data && this.props.user_data.map(user => {
      const value = {
        label: user.username,
        value: user.id,
      };
      return value;
    });
    return (
        <div className="rightbar">
          <h2>Status</h2>
          <div className="select-row">
            <div className="select">
              <Select
                  placeholder={this.props.card_data && this.props.card_data.status}
                  value={selectedStatus}
                  onChange={this.SelectStatusChange}
                  options={status_options}
              />
            </div>
            <div className={"circle-box-status " + this.state.displayStatus}>
              <div className={"circle-loader " + this.state.loadCompleteStatus}>
                <div className={"checkmark draw " + this.state.checkStatus}> </div>
              </div>
            </div>
          </div>
          <h2>Subscribed to</h2>

          <div className="subscribe-row">
            <div className="subscribe">

              <Select
                  placeholder={this.props.card_data.subsribed && this.props.card_data.subsribed.username}
                  value={selectedSubscribed}
                  onChange={this.SelectSubsribedChange}
                  options={options}
              />
            </div>
            <div className={"circle-box-status " + this.state.displaySubcribed}>
              <div className={"circle-loader " + this.state.loadCompleteSubcribed}>
                <div className={"checkmark draw " + this.state.checkSubcribed}> </div>
              </div>
            </div>
          </div>
          {console.log(this.props.card_data)}
          <h2 className="cursor date">End date -
            <span>{this.state.date ? moment(this.state.date).format('YYYY-MM-DD HH:mm').toString() :
                this.props.card_data ? moment(this.props.card_data.time_to).format('YYYY-MM-DD HH:mm') : ""}</span>
          </h2>

          <span>Change</span>
          <div className="datetime-picker">
            <DateTimePicker
                onChange={this.onDateChange}
                value={this.state.date}
            />
          </div>
        </div>

    );
  }
}

export default Rightbar;
