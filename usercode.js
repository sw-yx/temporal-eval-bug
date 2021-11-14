console.log('hello this is stage 0');
const signal1 = wf.defineSignal("signal1")
const signal2 = wf.defineSignal("signal2")
let secret = "password"
console.log(Object.keys(wf))
wf.setHandler(signal1, arg => {
  console.log('signal1 received ', arg)
  secret = arg
});
console.log('hello this is stage 0.5');
await wf.condition(() => secret === 'stage1');
console.log('passed stage 1');

wf.setHandler(signal2, arg => {
  console.log('signal2 received ', arg)
  secret = arg
})
await wf.condition(() => secret === 'stage2');
console.log('passed stage 2');