import _ from "lodash";
import { ADD_SOLVE, CLEAR_SESSION, CLEAR_HISTORY } from "../actions";

const selectSlice = state => _.get(state, "history");

export const selectHistorySlice = (state, cubeClass = "3x3") => {
  let hist = selectSlice(state).history[cubeClass];
  if (_.isNil(hist)) {
    hist = defaultCubeHistorySlice(cubeClass);
  }
  return hist;
};

export const selectSessionHistorySlice = (state, cubeClass = "3x3") => {
  let hist = selectSlice(state).session[cubeClass];
  if (_.isNil(hist)) {
    hist = defaultCubeHistorySlice(cubeClass);
  }
  // TODO: stats
  // stats: {
  //     min: null,
  //         max: null,
  //             avgDuration: 0
  // }
  return hist;
};

const defaultState = {
  session: {},
  fullHistory: {}
};

const defaultCubeHistorySlice = cubeClass => ({
  cubeClass,
  solves: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_SOLVE: {
      const cubeClass = _.defaultTo(action.cubeClass, "3x3");
      const { session, fullHistory } = state;
      if (_.isNil(session[cubeClass])) {
        session[cubeClass] = defaultCubeHistorySlice(cubeClass);
      }
      if (_.isNil(fullHistory[cubeClass])) {
        fullHistory[cubeClass] = defaultCubeHistorySlice(cubeClass);
      }
      console.log({ session, fullHistory });
      return {
        fullHistory: {
          [cubeClass]: {
            cubeClass,
            solves: [...fullHistory[cubeClass].solves, action.solve]
          }
        },
        session: {
          [cubeClass]: {
            cubeClass,
            solves: [...session[cubeClass].solves, action.solve]
          }
        }
      };
    }

    case CLEAR_HISTORY: {
      const cubeClass = _.defaultTo(action.cubeClass, "3x3");
      return {
        fullHistory: {
          ...state.session,
          [cubeClass]: defaultCubeHistorySlice()
        },
        session: {
          ...state.session,
          [cubeClass]: defaultCubeHistorySlice()
        }
      };
    }
    case CLEAR_SESSION: {
      const cubeClass = _.defaultTo(action.cubeClass, "3x3");
      return {
        session: {
          ...state.session,
          [cubeClass]: defaultCubeHistorySlice()
        }
      };
    }

    default:
  }
  return state;
};
