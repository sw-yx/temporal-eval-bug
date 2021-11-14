const fetch = require('node-fetch');
const fs = require('fs');
const userCode = fs.readFileSync('usercode.js', 'utf8');
// const userCode = fs.readFileSync('workflow.js', 'utf8');
console.log({userCode});

(async function() {
  await fetch('https://d7ea-24-19-160-41.ngrok.io/invoke/DemoWorkflow', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic OWU2ZjQ0NGMtNTc0NS00MWMxLTk3Y2QtZDE4OTc1Y2Y0MDk0Og==' 
    },
    body: JSON.stringify({"Input":[JSON.stringify(userCode)]})
  });
})()