import { useEffect, useState } from "react";
import "./App.css";
import { pollquestions } from "./utils";

// const pollquestions = [
//   {
//     id: "1",
//     question: "how is your day today?",
//     options: ["its ok", "I have seen better days", "dont ask me about it"],
//     polltaken: false,
//   },
//   {
//     id: "2",
//     question: "What person are you?",
//     options: ["Beach person", "Mountain person", "I dont care"],
//     polltaken: false,
//   },
// ];

function App() {
  const [currentPoll, setCurrentPoll] = useState(null);
  useEffect(() => {
    console.log("window.location.pathname : ", window.location.pathname);
    let thepath = window.location.pathname;
    if (localStorage.getItem(thepath)) {
      console.log("found the path in localstorage : ", thepath);
      setCurrentPoll(
        pollquestions[parseInt(localStorage.getItem(thepath)) - 1]
      );
    } else {
      let items = localStorage.getItem("assignedpaths");
      if (items) {
        console.log("assigned paths has items", items.split(","));
        let assignedPaths = items.split(",");
        let available = pollquestions.filter(
          (obj) => !assignedPaths.includes(obj.id)
        );
        if (available.length) {
          localStorage.setItem("assignedpaths", [
            ...assignedPaths,
            available[0].id,
          ]);
          localStorage.setItem(thepath, available[0].id);
          setCurrentPoll(pollquestions[available[0].id - 1]);
        }
      } else {
        console.log("assigned paths has NO items");
        localStorage.setItem("assignedpaths", [1]);
        localStorage.setItem(thepath, "1");
        setCurrentPoll(pollquestions[0]);
      }
    }
  }, [window.location.pathname]);

  return (
    <div className="App" id="hw">
      <h2>Poll for ({window.location.pathname})</h2>

      {currentPoll ? (
        <div>
          <h1>{currentPoll.question}</h1>
          {
            <ul>
              {currentPoll.options.map((opt, index) => (
                <li key={index}>{opt}</li>
              ))}
            </ul>
          }
        </div>
      ) : null}
    </div>
  );
}

export default App;
