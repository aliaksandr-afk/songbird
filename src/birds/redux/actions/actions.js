export const SCORE_UP = 'SCORE_UP';
export const SET_SELECTED_BIRD = 'SET_SELECTED_BIRD';
export const NEXT_LEVEL = 'NEXT_LEVEL';
export const START_AGAIN = 'START_AGAIN';

export function setSelectedBird(name) {
  return { type: SET_SELECTED_BIRD, name }
}

export function scoreUp(name) {
  return { type: SCORE_UP, name };
}

export function nextLevel() {
  return { type: NEXT_LEVEL }
}

export function startAgain() {
  return { type: START_AGAIN }
}
