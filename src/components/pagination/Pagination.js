import React, { Component } from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

const propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initialPage: PropTypes.number
}

const defaultProps = {
  initialPage: 1
}

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    if (this.props.items && this.props.items.length) {
      this.setPage(this.props.initialPage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage);
    }
  }

  setPage(page) {
    var items = this.props.items;
    var pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    pager = this.getPager(items.length, page);

    var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

    this.setState({ pager: pager });

    this.props.onChangePage(pageOfItems);
  }

  getPager(totalItems, currentPage, pageSize) {
    currentPage = currentPage || 1;

    pageSize = pageSize || 15;

    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    var pages = _.range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  render() {
    var pager = this.state.pager;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <ul className="pagination">
        <li className={'pagination__item ' + (pager.currentPage === 1 ? '_disabled' : '')}>
          <button onClick={() => this.setPage(1)}>First</button>
        </li>
        <li className={'pagination__item ' + (pager.currentPage === 1 ? '_disabled' : '')}>
          <button onClick={() => this.setPage(pager.currentPage - 1)}>Previous</button>
        </li>
        {pager.pages.map((page, index) =>
          <li key={index} className={'pagination__item ' + (pager.currentPage === page ? '_active' : '')}>
            <button onClick={() => this.setPage(page)}>{page}</button>
          </li>
        )}
        <li className={'pagination__item ' + (pager.currentPage === pager.totalPages ? '_disabled' : '')}>
          <button onClick={() => this.setPage(pager.currentPage + 1)}>Next</button>
        </li>
        <li className={'pagination__item ' + (pager.currentPage === pager.totalPages ? '_disabled' : '')}>
          <button onClick={() => this.setPage(pager.totalPages)}>Last</button>
        </li>
      </ul>
    );
  }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;

export default Pagination;