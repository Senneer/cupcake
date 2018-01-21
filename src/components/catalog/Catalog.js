import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Catalog.css';
import Basket from '../basket/Basket';
import Pagination from '../pagination/Pagination';

const url = 'https://jsonplaceholder.typicode.com/photos';

class Catalog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      pageOfItems: []
    };

    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  componentDidMount() {
    fetch(url)
      .then(res => res.json())
      .then(data => this.props.onLoadData(data));
  }

  addCount(id) {
    this[`count${id}`].value++;
  }
  subtractCount(id) {
    if (this[`count${id}`].value > 1) {
      this[`count${id}`].value--;
    }
  }

  render() {
    return (
      <div>
        <Basket />
        <ul className="catalog">
          {this.state.pageOfItems.map(item =>
            <li key={item.id} className="catalog__item">
              <Link to={`${item.albumId}/${item.id}`} className="catalog__itemPreview">
                <img src={item.thumbnailUrl} alt="" />
              </Link>
              <p className="catalog__itemTitle">{item.title}</p>
              <div className="catalog__itemCtrls">
                <button className="catalog__itemAdd" onClick={() => this.props.onAddProd({product: item, count: parseInt(this[`count${item.id}`].value, 10)})}>Add</button>
                <div className="catalog__itemCount">
                  <button className="catalog__itemCountBtn _del" onClick={() => this.subtractCount(item.id)}>-</button>
                  <input type="text" className="catalog__itemCountNum" pattern="[0-9]*" disabled defaultValue="1" ref={(input => this[`count${item.id}`] = input)} />
                  <button className="catalog__itemCountBtn _add" onClick={() => this.addCount(item.id)}>+</button>
                </div>
              </div>
            </li>
          )}
        </ul>
        <Pagination items={this.props.basket.goodsTotal} onChangePage={this.onChangePage} />
      </div>
    )
  }
}

export default connect(
  state => ({
    basket: state
  }),
  dispatch => ({
    onLoadData: (arr) => {
      dispatch({type: 'LOAD_DATA', payload: arr});
    },
    onAddProd: (prod) => {
      dispatch({type: 'ADD_PROD', payload: prod});
    }
  })
)(Catalog);