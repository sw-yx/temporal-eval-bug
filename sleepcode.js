console.log('hi');
const pwSignal = wf.defineSignal('trypw');
let password = '';
wf.setHandler(pwSignal, (newPW) => {
  console.log('received signal', newPW);
  password = newPW;
});
wf.sleep(20000);
console.log('bye', password);