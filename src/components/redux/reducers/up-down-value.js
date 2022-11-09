const initialnumber = 0;

const changeTheNumber = (state = initialnumber, action) => {
  switch (action.type) {
    case "INCREEMENT":
      return state + 1;
      break;
    case "DECREEMENT":
      return state - 1;
      break;

    default:
      return state;
      break;
  }
};
export default changeTheNumber;
 