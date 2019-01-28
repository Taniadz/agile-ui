import React, {Component} from 'react';
import axios from 'axios';
import {API} from '../../const';
import Rightbar from "./Rightbar"
import Leftbar from "./Leftbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from "react-router-dom";

    class  Card extends Component {
      state = {
        card_data: [],
        user_data: [],
        cardId: null,
      };

      loadCard(id) {
        axios.get(API + 'cards/' + id).then(res => {
          const card_data = res.data;
          this.setState({card_data});
        });
      }
      loadUsers() {
        axios.get(API + 'users/').then(res => {
          const user_data = res.data;
          this.setState({user_data: user_data});
        });
      }

      componentDidMount() {
        let id = this.props.match.params.card.slice(1);
        this.setState({cardId:id});
        this.loadCard(id);
        this.loadUsers();
      }

      render() {

        return (
            <div className="agile-card">
              <Link to='/'>
                <h3 className="boad-back"><FontAwesomeIcon icon="igloo" />  Back to board </h3>
              </Link>
            <div className="Card">
              <div className="container">
                <div className="container-flex">
                  <Leftbar card_data={this.state.card_data} user_data={this.state.user_data} cardId={this.state.cardId}/>
                  <Rightbar card_data={this.state.card_data} user_data={this.state.user_data} cardId={this.state.cardId}/>

                </div>
              </div>
            </div>
            </div>
        );
      }
    }
export default Card;
