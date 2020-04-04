import {
  SCORE_UP, SET_SELECTED_BIRD, NEXT_LEVEL, START_AGAIN,
} from '../actions/actions';
import birdsData from '../../birds';

const randomBird = Math.floor(Math.random() * 6);

const initialState = {
  birds: [...birdsData],
  birdCategory: 0,
  score: 0,
  secretBird: birdsData[0][randomBird],
  selectedBird: birdsData[0][0],
  attemptCount: 0,
  guessed: false,
  gameOver: false,
  birdGroup: birdsData[0],
};

function birdsRootReducer(state = initialState, action) {
  const birdsArray = [...birdsData];
  let selectedBird = {};
  let nextCategory = '';
  let luckykBird = {};

  switch (action.type) {
    case SCORE_UP:
      luckykBird = state.birdGroup.filter(x => x.name === action.name)[0];
      luckykBird.style = 'success';

      if (luckykBird.answered === undefined || luckykBird.answered === null) {
        luckykBird.answered = true;
        state.score = state.score + 5 - state.attemptCount
      }

      return {
        birds: [
          ...birdsArray,
        ],
        birdCategory: state.birdCategory,
        secretBird: state.secretBird,
        score: state.score,
        selectedBird: birdsData[state.birdCategory].filter(x => x.name === action.name)[0],
        attemptCount: state.attemptCount,
        guessed: true,
        birdGroup: [...state.birdGroup],
        gameOver: state.gameOver,
      };
    case SET_SELECTED_BIRD:

      selectedBird = birdsData[state.birdCategory].filter(x => x.name === action.name)[0];
      state.birdGroup.filter(x => x.name === action.name)[0].style = 'error';
      return {
        birds: [
          ...birdsArray,
        ],
        birdCategory: state.birdCategory,
        secretBird: state.secretBird,
        score: state.score,
        selectedBird,
        attemptCount: state.attemptCount += 1,
        guessed: state.guessed,
        birdGroup: [...state.birdGroup],
        gameOver: state.gameOver,
      };
    case NEXT_LEVEL:

      nextCategory = state.birdCategory + 1;
      if (state.birds.length === nextCategory) {
        state.gameOver = true;
        nextCategory = 0;
      }
      return {
        birds: [
          ...birdsArray,
        ],
        birdCategory: nextCategory,
        secretBird: birdsArray[nextCategory][Math.floor(Math.random() * 6)],
        score: state.score,
        selectedBird,
        attemptCount: 0,
        guessed: false,
        gameOver: state.gameOver,
        birdGroup: [...birdsArray[nextCategory]],
      };

    case START_AGAIN:

      birdsData.forEach(x => x.forEach((y) => {
        delete y.style;
        delete y.answered;
      }));

      return {
        birds: {
          ...birdsData,
        },
        birdCategory: 0,
        score: 0,
        secretBird: birdsData[0][randomBird],
        selectedBird: birdsData[0][0],
        attemptCount: 0,
        gameOver: false,
        birdGroup: [...birdsData[0]],
        guessed: false,
      };
    default:
      return state;
  }
}

export default birdsRootReducer;
