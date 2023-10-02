const initialState = {
    id: undefined,
    email: undefined,
    displayName: undefined,
};

export const user = {
  state: initialState,
  reducers: {
    setUser(_state, newUser) {
      return newUser;
    },
  },
  effects: (dispatch) => ({}),
};