const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    (true)
      ? setTimeout(() => resolve('Do something async'), 3000)
      : reject(new Error('Test error'))
  })
}

const doSomething = async () => {
  const something = await doSomethingAsync();
  console.log(`${something} first time`);
}

console.log('Before');
doSomething();
console.log('After');

const anotherFunction = async () => {
  try {
    const something = await doSomethingAsync();
    console.log(`${something} second time`);
  } catch (error) {
    console.error(error);
  }
}

console.log('Before 1');
anotherFunction();
console.log('After 1');