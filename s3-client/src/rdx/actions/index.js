const makeActionCreator = (type, ...argNames) => (...args) => {
  const action = { type };
  argNames.forEach((arg, index) => (action[argNames[index]] = args[index]));
  return action;
};

/* <<<<<<< HISTORY >>>>>>>> */

export const ADD_SOLVE = "ADD_SOLVE";
export const addSolve = makeActionCreator(ADD_SOLVE, "solve", "cubeClass");

export const CLEAR_SESSION = "CLEAR_SESSION";
export const clearSession = makeActionCreator(CLEAR_SESSION, "cubeClass");

export const CLEAR_HISTORY = "CLEAR_HISTORY";
export const clearHistory = makeActionCreator(CLEAR_HISTORY, "cubeClass");
