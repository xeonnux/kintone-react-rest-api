// 04_StateEffect_index.js | Successfully output the response in React!

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Call Random User Generator API
const restEndpoint = "https://randomuser.me/api/";

const callRestApi = async () => {
  const response = await fetch(restEndpoint);
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return JSON.stringify(jsonResponse);
};

function RenderResult() {
  // const [state, setState] = useState(initialState);
  const [apiResponse, setApiResponse] = useState("*** now loading ***");

  // useEffect takes 2 arguments:
  // 1st = effect is the function that is executed when the React Component is rendered
  // 2nd = Empty array as dependency so useEffect is only invoked once
  useEffect(() => {
    callRestApi().then(
      result => setApiResponse(result));
  }, []);

  return (
    <div>
      <h1>React App</h1>
      <p>{apiResponse}</p>
    </div>
  );
};

ReactDOM.render(
  <RenderResult />,
  document.querySelector('#root')
);

/*
Uses useState Hooks and useEffect Hooks to handle the async API call function
Expected output: [Success!]
Outputs the Random User API Call to the page
*/
