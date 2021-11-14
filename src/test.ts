import { Connection, WorkflowClient } from '@temporalio/client';
import { DemoWorkflow } from './workflows';

// const fetch = require('node-fetch');
const fs = require('fs');
// const userCode = fs.readFileSync('usercode.js', 'utf8');
const userCode = fs.readFileSync('sleepcode.js', 'utf8');
console.log({userCode});

async function run() {
  const connection = new Connection(); // Connect to localhost with default ConnectionOptions.
  // In production, pass options to the Connection constructor to configure TLS and other settings.
  // This is optional but we leave this here to remind you there is a gRPC connection being established.

  const client = new WorkflowClient(connection.service, {
    // In production you will likely specify `namespace` here; it is 'default' if omitted
    workflowDefaults: { taskQueue: 'tutorial' },
  });

  // Invoke the `example` Workflow, only resolved when the workflow completes
  const result = await client.execute(DemoWorkflow, {
    workflowId: 'IncludedWorkflow-ID',
    args: [userCode],
  });
  console.log(result); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
