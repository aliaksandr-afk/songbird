import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const birdsCategory = [{ id: 0, category: 'Разминка' },
  { id: 1, category: 'Воробьиные' },
  { id: 2, category: 'Лесные птицы' },
  { id: 3, category: 'Певчие птицы' },
  { id: 4, category: 'Хищные птицы' },
  { id: 5, category: 'Морские пртицы' }];

class BirdCategories extends Component {
  render() {
    const playerScore = `Score: ${this.props.score}`;

    const birdsCategories = birdsCategory.map(item => (
      <li className={this.props.birdCategory === item.id ? 'page-item active' : 'page-item'} key={item.id}>
        <span className="page-link">
          {item.category}
        </span>
      </li>
    ));

    return (
      <div className="header d-flex">
        <div className="top-panel d-flex">
          <div className="logo" />
          <h5>{playerScore}</h5>
        </div>
        <ul className="pagination">{birdsCategories}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  birds: state.birds,
  birdCategory: state.birdCategory,
  score: state.score,
});


export default connect(mapStateToProps)(BirdCategories);

BirdCategories.propTypes = {
  birdCategory: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
