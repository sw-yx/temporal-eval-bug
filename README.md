# temporal-eval-bug

this repo shows how `eval` doesnt work with wf.sleep or wf.condition 

- `src/workflows/index.ts` takes an arg and `evals` code with workflow api's exposed.
- `src/test.ts` reads `sleepcode.js` and calls `client.execute` with that code (for evaling)
- `sleepcode.js` is the intended "REPL" code that users would inject.

The bug is that Timers inside of `eval` - including `wf.sleep` and `wf.condition` - do not seem to block.
For `wf.sleep` there is a TimerStarted event, but no TimerFired, and the wf just goes ahead to complete.

We can choose to simply ban `eval`, but it would be very interesting for REPL usecases and metaprogramming/advanced usecases.

We should also doublecheck if it ever makes sense for TimerStarted to go straight to WorkflowExecutionComplete without passing by TimerFired. Should that be an explicit impossibility in our state machine?
