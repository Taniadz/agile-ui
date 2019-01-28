import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Board from 'react-trello'
import {connect} from "react-redux";
import {LOAD_CARDS} from "../actions/cards"
import {Redirect} from 'react-router-dom'
import {API} from '../const';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function mapStateToProps({cards, auth}, props) {
  return {
    ...props,
    cards: cards,
    auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
      {
        LOAD_CARDS,
      },
      dispatch,
  );
}


class Agile extends Component {
  state = {
    cardId: "",
    clicked: "",
  };

  componentDidMount() {
    this.props.LOAD_CARDS();
  }

  cardClick = (cardId, cardDetails, laneId) => {
    this.setState({
      cardId: cardId,
      clicked: true,
    });
  };

  cardDelete = (card, laneId) => {
    let url = API + "cards/" + card + "/";
    axios({
      method: 'PATCH',
      headers: {
        "Authorization": 'JWT ' + localStorage.getItem('token'),
      },
      url: url,
      data: {
        is_deleted: "True",
      },
    });
  };
  cardDragged = (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
    let url = API + "cards/" + cardId + "/";
    axios({
      method: 'PATCH',
      headers: {
        "Authorization": 'JWT ' + localStorage.getItem('token'),
      },
      url: url,
      data: {
        status: targetLaneId,
      },
    });
    console.log(cardId, targetLaneId)
  };


  load_board_data = () => {
    let todoList = [];
    let inProgressList = [];
    let doneList = [];
    console.log(this.props.cards);
    if (this.props.cards.cards) {
      this.props.cards.cards.map(card => {
        if (card.status === "TO DO") {
          todoList.push(card)
        }
        if (card.status === "IN PROGRESS") {
          inProgressList.push(card)
        }
        if (card.status === "DONE") {
          doneList.push(card)
        }
        return (card);
      });
    }
    return {
      lanes: [
        {
          id: 'TO DO',
          title: 'TO DO',
          // label: 'delete',
          cards: todoList
        },
        {
          id: 'IN PROGRESS',
          title: 'In progress',
          // label: '0/0',
          cards: inProgressList
        },
        {
          id: 'DONE',
          title: 'DONE',
          // label: '0/0',
          cards: doneList
        }
      ]
    };
  };
  cardAdd = (card, laneId) => {
    axios({
      method: 'POST',
      url: API + "cards/",
      headers: {
        "Authorization": 'JWT ' + localStorage.getItem('token'),
      },
      data: {
        title: card.title,
        description: card.description,
        status: laneId,
        author_id: localStorage.getItem('user_id'),
      },
    });
    this.props.LOAD_CARDS();
    this.load_board_data()
  };

  render() {
    if (this.state.clicked) {
      return <Redirect to={`/card:${this.state.cardId}`}/>
    }
    let editable = !!localStorage.getItem('token');
    let draggable = !!localStorage.getItem('token');
    return (
        <Board data={this.load_board_data()} draggable={draggable} editable={editable}
               onCardClick={this.cardClick}
               onCardAdd={this.cardAdd}
               onCardDelete={this.cardDelete}
               handleDragEnd={this.cardDragged}
        />
    )
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Agile));