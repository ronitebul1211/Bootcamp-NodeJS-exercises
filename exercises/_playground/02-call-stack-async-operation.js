console.log("Starting...");

setTimeout(() => {
   console.log("Two seconds");
}, 2000);

setTimeout(() => {
   console.log("Zero seconds");
}, 2000);

console.log("Finishing...");

/**
 
node main execute sync
node API uses other thread in c++ to manage async event - cause the non-blocking nature of node js

when function in call stack invoke async event, its move to nodes api, 
call stack available to keep executing functions in sync way.

when async event in nodes api finish...
its pass callback to the callback queue

the event loop, check all the time for callback,
if callback wait, wait for the first opportunity the call stack is empty
than, pass the waiting callback to execute... 

 script start execute:
 call stack:
 - main()

 line 1:
  call stack:
 - main()
 - console.log("Starting...")

 line 3:
  call stack:
 - main()
 - setTimeout(..., 2000)
 
 line 3:
  call stack:
 - main()
 - setTimeout(..., 2000)
  node APIs:
  - setTimeout(2 sec) -> wait to finish (2 sec) -> pass callback to queue



*/
