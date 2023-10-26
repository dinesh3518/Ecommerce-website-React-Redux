
//convert the json file for storing and retaining from the localstorage
const serializeCartItems = (cartItems) => {
    return JSON.stringify(cartItems);
  };

  const deserializeCartItems = (jsonString) => {
    return JSON.parse(jsonString);
  };

  export {serializeCartItems,deserializeCartItems};