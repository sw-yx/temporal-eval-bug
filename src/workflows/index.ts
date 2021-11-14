import * as workflowapi from "@temporalio/workflow";

const activities = workflowapi.proxyActivities({
  scheduleToCloseTimeout: '10mins'
})

export async function DemoWorkflow(code: string): Promise<string> {
  console.log("User code initialized with: ", code);
  const wf = {
    sleep: workflowapi.sleep,
    proxyActivities: (name: string) =>
      console.log("Activity " + name + " received"),
    defineSignal: workflowapi.defineSignal,
    setHandler: workflowapi.setHandler,
    condition: workflowapi.condition,
  };
  const sum = eval(`1+2`);
  console.log({sum: sum});
  console.log('activity says', await activities.greet());
  const executeUserCode = () => new Promise<void>(res => {
    eval(`(async function internalFn() {${code}})()`);
    res();
  })
  await executeUserCode()
  return sum;
}


// export async function DemoWorkflow(code: string): Promise<string> {
//   // let code = ''
//   console.log("User code initialized with: ", code);
//   const wf = {
//     sleep: workflowapi.sleep,
//     proxyActivities: (name: string) =>
//       console.log("Activity " + name + " received"),
//     defineSignal: workflowapi.defineSignal,
//     setHandler: workflowapi.setHandler,
//     condition: workflowapi.condition,
//   };
//   const sum = eval(`1+2`);
//   workflowapi.sleep(1000);
//   console.log('activityA says: ', await activities.greet());
//   console.log({ sum });
//   eval(`(async function internalFn() {${code}})()`);
//   console.log('activityB says: ', await activities.greet());
//   return sum;
// }
