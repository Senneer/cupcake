import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Pc.css';

class Pc extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.goodsTotal[this.props.match.params.id];
  }
  render() {
    return (
      <div className="pc">
        <div className="pc__wrapper">
          <div className="pc__photo"><img src={this.state.url} alt="" /></div>
          <div className="pc__info">
            <p>Album ID: {this.state.albumId}</p>
            <p>Item ID: {this.state.id}</p>
            <p>{this.state.title}</p>
          </div>
          <Link to="/" className="pc__close">Close</Link>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    goodsTotal: state.goodsTotal
  })
)(Pc);