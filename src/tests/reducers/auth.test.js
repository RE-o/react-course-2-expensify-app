import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const uid = 'c81fc0c0-ad9d-4100-8554-b698947102dd';
  const action = {
    type: 'LOGIN',
    uid
  };

  const state = authReducer({}, action);
  expect(state).toEqual({ uid });
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  };

  const state = authReducer(undefined, action);
  expect(state).toEqual({});
})
