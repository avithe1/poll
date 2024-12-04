import { useEffect, useState } from "react";
import "./App.css";

let initializepollquestions = [
  {
    id: "1",
    question: "how is your day today?",
    options: ["its ok", "I have seen better days", "dont ask me about it"],
    polltaken: false,
  },
  {
    id: "2",
    question: "What person are you?",
    options: ["Beach person", "Mountain person", "I dont care"],
    polltaken: false,
  },
];

let writingpollquestionstolocalstorage = false;

function App() {
  const [currentPoll, setCurrentPoll] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [pollquestions, updatePollQuestions] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedValue(value);

    let updated = {
      ...currentPoll,
      polltaken: true,
      answer: value,
    };

    setCurrentPoll(updated);

    updatePollQuestions([
      ...pollquestions.filter((poll) => poll.id != currentPoll.id),
      updated,
    ]);

    initializepollquestions = [
      ...pollquestions.filter((poll) => poll.id != currentPoll.id),
      updated,
    ];

    localStorage.setItem(
      "pollquestions",
      JSON.stringify([
        ...pollquestions.filter((poll) => poll.id != currentPoll.id),
        updated,
      ])
    );
  };

  useEffect(() => {
    let pq = localStorage.getItem("pollquestions");
    if (pq && !writingpollquestionstolocalstorage) {
      console.log("here....");
      console.log(pq, pq.split(","));
      let arr = pq.split(",");
      console.log(arr[0]);
      updatePollQuestions(JSON.parse(pq));
    } else {
      writingpollquestionstolocalstorage = true;
      localStorage.setItem(
        "pollquestions",
        JSON.stringify(initializepollquestions)
      );
      updatePollQuestions(initializepollquestions);
    }
  }, []);

  useEffect(() => {
    if (pollquestions === null) {
      return;
    }

    console.log("window.location.pathname : ", window.location.pathname);
    let thepath = window.location.pathname;
    if (localStorage.getItem(thepath)) {
      console.log("found the path in localstorage : ", thepath);
      setCurrentPoll(pollquestions.filter((poll) => poll.id == localStorage.getItem(thepath))[0]);
      //setCurrentPoll(pollquestions[parseInt(localStorage.getItem(thepath))]);
    } else {
      let items = localStorage.getItem("assignedpaths");
      if (items) {
        console.log("assigned paths has items", items.split(","));
        let assignedPaths = items.split(",");
        if (assignedPaths.length < pollquestions.length) {
          let available = pollquestions.filter(
            (obj) => !assignedPaths.includes(obj.id)
          );
          if (available.length) {
            localStorage.setItem("assignedpaths", [
              ...assignedPaths,
              available[0].id,
            ]);
            localStorage.setItem(thepath, available[0].id);
            setCurrentPoll(
              pollquestions.filter((poll) => poll.id == available[0].id)[0]
            );
          }
        }
      } else {
        console.log("assigned paths has NO items");
        localStorage.setItem("assignedpaths", [1]);
        localStorage.setItem(thepath, "1");
        setCurrentPoll(pollquestions.filter((poll) => poll.id == "1")[0]);
      }
    }
  }, [pollquestions, window.location.pathname]);

  return (
    <div className="App" id="hwouter">
      <div id="hw">
        <div id="pollheading">
          <div>Poll for ({window.location.pathname})</div>

          {pollquestions ? (
            <div>
              Polls taken :{" "}
              {pollquestions.filter((poll) => poll.polltaken).length}/
              {pollquestions.length}{" "}
            </div>
          ) : null}
        </div>

        {currentPoll ? (
          <div>
            <h1>{currentPoll.question}</h1>
            {currentPoll.polltaken ? (
              <div>
                <p>
                  You answered : <b>{currentPoll.answer}</b>
                </p>
                <p>Your option has been recorded, thank you!</p>
              </div>
            ) : (
              <ul id="list">
                {currentPoll.options.map((opt, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={opt}
                      value={opt}
                      checked={selectedValue === opt}
                      onChange={() => handleRadioChange(opt)}
                    />
                    <label htmlFor={opt}>{opt}</label>
                  </div>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p>Poll not available</p>
        )}
      </div>
    </div>
  );
}

export default App;
