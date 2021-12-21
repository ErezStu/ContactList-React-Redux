const initialState = [
  {
    id: 0,
    name: "Test",
    email: "test@test.com",
    phoneNumber: 1234567890,
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      state = [...state, action.payload];
      return state;

    case "UPDATE_CONTACT":
      const updateState = state.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );
      state = updateState;
      return state;

    case "DELETE_CONTACT":
      const filteredContacts = state.filter(
        (contact) => contact.id !== action.payload && contact
      );
      state = filteredContacts;

      return state;
    default:
      return state;
  }
};

export default contactReducer;
