const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'Abba',
      age: 26
    });
    // reject('sometheing wen wrong');
  }, 5000);
});
console.log('before');

promise.then((data) => {
  console.log('1', data);

  // if we return a promise. The next then callback is that promise success case
  // the then callback runs only in the case promise resolve. What it gets passed is, in this case, the resolve string.
  // This is differente then return a string. In the first case the string is passed only if the promise resolves
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('This is my other promise');
    }, 5000);
  });
}).then((str) => {
    console.log('does this run?', str);
  }).catch((error) => {
    console.log('error: ', error);
  });

console.log('after');
