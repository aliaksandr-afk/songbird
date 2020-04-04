import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSelectedBird, scoreUp, nextLevel } from './redux/actions/actions';
import okSound from '../static/sounds/ok.wav'
import errorSound from '../static/sounds/error.wav'
import sound from '../utils';

class Game extends Component {

    checkAnswer = (selection) => {
      if (this.props.secretBird.name === selection) {
        const secretPlayer = document.getElementById('secretPlayer');
        secretPlayer.pause();
        sound(okSound);
        this.props.scoreUp(selection)
      } else {
        this.props.setSelectedBird(selection);
        sound(errorSound);
      }
    };

    render() {
      const info = [ 'background: green', 'color: white', 'display: block', 'text-align: center'].join(';');
      // eslint-disable-next-line no-console
      console.info(`%c You should choose: ${this.props.secretBird.name}`, info);

      const selectedBird = this.props.selectedBird;
      const buttonClassname = !this.props.guessed ? 'btn' : 'btn btn-next';
      const visibility = !this.props.gameOver ? '' : 'none';
      const displayInstruction =  this.props.attemptCount === 0 ;

      const birdsItems = this.props.birdGroup.map(bird => (

        <li className={`list-group-item default ${bird.style}`} key={bird.id} onClick={() => this.checkAnswer(bird.name)}>
          <span className="li-btn" />
          {bird.name}
        </li>
      ));

      return (
        <React.Fragment>
          <div className="row mb2" style={{ display: visibility }}>
            <div className="col-md-6">
              <ul className="item-list list-group">
                {birdsItems}
              </ul>
            </div>
            <div className="col-md-6">
              <div className="bird-details card">
                <div className='alert alert-warning' style={{display:displayInstruction ? '' : 'none'}}><strong>Прослушайте аудио запись.</strong> Выберите правильный вариант из списка</div>
                <div className="card-body" style={{display:displayInstruction ? 'none' : ''}}>
                  <img src={selectedBird.image} alt={selectedBird.name} className="bird-image" />
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <h4>{selectedBird.name}</h4>
                    </li>
                    <li className="list-group-item">
                      <span>{selectedBird.species}</span>
                    </li>
                    <li className="list-group-item">
                      <audio src={selectedBird.audio} controls autoPlay={false} className="birdAudion" />
                    </li>
                  </ul>
                </div>
                <span className="bird-description" style={{display:displayInstruction ? 'none' : ''}}>
                  {selectedBird.description}
                </span>
              </div>
            </div>
            <button onClick={this.props.nextLevel} className={buttonClassname} type="button" value="Next Level" disabled={!this.props.guessed}>Next level</button>
          </div>
        </React.Fragment>
      )
    }
}

const mapStateToProps = state => ({
  birds: state.birds,
  birdCategory: state.birdCategory,
  secretBird: state.secretBird,
  selectedBird: state.selectedBird,
  guessed: state.guessed,
  birdGroup: state.birdGroup,
  gameOver: state.gameOver,
  score: state.score,
  attemptCount: state.attemptCount
});


const mapDispatchToProps = {
  setSelectedBird,
  scoreUp,
  nextLevel,
};


export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  birdGroup: PropTypes.arrayOf(PropTypes.any).isRequired,
  guessed: PropTypes.bool.isRequired,
  selectedBird: PropTypes.objectOf(PropTypes.any).isRequired,
  setSelectedBird: PropTypes.func.isRequired,
  scoreUp: PropTypes.func.isRequired,
  nextLevel: PropTypes.func.isRequired,
  secretBird: PropTypes.objectOf(PropTypes.any).isRequired,
  birdCategory: PropTypes.number.isRequired,
  attemptCount:PropTypes.number.isRequired,
  gameOver:PropTypes.bool.isRequired
};
