import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fakeImage from '../static/images/bird.06a46938.jpg';


class SecretBird extends Component {
  render() {
    let image;
    let name;

    ({ image, name } = this.props.secretBird);

    if (!this.props.guessed) {
      ({ image, name } = { image: fakeImage, name: '***' });
    }
    const secretBird = this.props.secretBird;
    const visibility = !this.props.gameOver ? '' : 'none';


    return (
      <React.Fragment>
        <div className="random-bird jumbotron rounded" style={{ display: visibility }}>
          <img className="bird-image" src={image} alt={name} />
          <div>
            <ul className="list-group list-group-flush">
              <h3>{name}</h3>
              <li className="list-group-item">
                <div>
                  <audio src={secretBird.audio} ref="audio_tag" controls autoPlay id="secretPlayer" />

                </div>
              </li>
            </ul>
          </div>

        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  birds: state.birds,
  birdCategory: state.birdCategory,
  secretBird: state.secretBird,
  guessed: state.guessed,
  gameOver: state.gameOver,
});


export default connect(mapStateToProps, null)(SecretBird);

SecretBird.propTypes = {
  guessed: PropTypes.bool.isRequired,
  secretBird: PropTypes.objectOf(PropTypes.any).isRequired,
  gameOver:PropTypes.bool.isRequired
};
