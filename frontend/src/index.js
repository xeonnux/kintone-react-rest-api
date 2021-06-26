// 11_POST_index.js | Frontend | Add a form to POST data

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

//Set the Request End-points
const getRecordsEndpoint = "http://localhost:5000/getData";
//Declare the new end-point /postData defined in our Express server.
const addRecordEndpoint = "http://localhost:5000/postData";

const callRestApi = async () => {
  const response = await fetch(getRecordsEndpoint); //Update End-point
  const jsonResponse = await response.json();
  console.log(jsonResponse);
  const ArrayOfLists = jsonResponse.records.map(
    record => <li key={record.recordID.value}><b>{record.title.value}</b> written by {record.author.value}</li>
  )
  return ArrayOfLists;
};

//Make REST API Calls & take in the values stored in the state variables related to the input fields
const AddNewRecord = async (title, author) => {
  const RecordBodyParameters = {
    title,
    author
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(RecordBodyParameters)
  }

  const response = await fetch(addRecordEndpoint, options);
  const jsonResponse = await response.json();
  console.log(JSON.stringify(jsonResponse));
  return jsonResponse;
};

function RenderResult() {
  const [apiResponse, setApiResponse] = useState("*** now loading ***");

  // Create States for the Input Fields
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [successCounter, setSuccessCounter] = useState(0);

  useEffect(() => {
    callRestApi().then(
      result => setApiResponse(result));
  }, [successCounter]);

  // Define the onChange functions
  function HandleTitleChange(event) {
    setTitleValue(event.target.value);
  }

  function HandleAuthorChange(event) {
    setAuthorValue(event.target.value);
  }

  // Define the Button Click function
  function ButtonClick() {
    setApiResponse(apiResponse.concat(<li key="0" >*** now loading ***</li>));
    AddNewRecord(titleValue, authorValue)
      .then(response => {
        setSuccessCounter(successCounter + 1);
      }
      );
  }

  // Add a Form
  return (
    <div>
      <h1>React App</h1>
      <ul>{apiResponse}</ul>
      <form>
        <div>
          <label htmlFor="title-input">Title:</label>
          <input type="text" value={titleValue} id="title-input" onChange={HandleTitleChange} />
        </div>
        <div>
          <label htmlFor="author-input">Author:</label>
          <input type="text" value={authorValue} id="author-input" onChange={HandleAuthorChange} />
        </div>
        <button type="button" onClick={ButtonClick}>Add data</button>
      </form>
    </div>
  );
};

ReactDOM.render(
  <RenderResult />,
  document.querySelector('#root')
);

/*
frontend - React project side
Expected Output at http://localhost:3000/
Form at the bottom to add user input
Display Kintone app data as a clean list
*/
