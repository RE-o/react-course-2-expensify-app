import { login, logout } from '../../actions/auth';

test('should setup login action object', () => {
  const uid = '7dab9d9d-35d0-40da-b1a0-b538cc66788f';
  const action = login(uid);

  expect(action).toEqual({
      type: 'LOGIN',
      uid
  });
})

test('should setup logout action object', () => {
  const action = logout();

  expect(action).toEqual({
      type: 'LOGOUT'
  });
})
