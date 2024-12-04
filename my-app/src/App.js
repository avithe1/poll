import { useEffect, useState } from "react";
import "./App.css";

const pollquestions = [
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

function App() {
  const [assignedPaths, setAssignedPaths] = useState({});
  const [currentPoll, setCurrentPoll] = useState(null);
  useEffect(() => {
    console.log("window.location.pathname : ", window.location.pathname);
    let thepath = window.location.pathname;
    if (localStorage.getItem(thepath)) {
      if (assignedPaths[thepath]) {
      } else {
        assignedPaths[thepath] = (
          Object.keys(assignedPaths).length + 1
        ).toString();
        setCurrentPoll(
          pollquestions.filter(
            (poll) =>
              poll.id === (Object.keys(assignedPaths).length + 1).toString()
          )[0]
        );
      }
    } else {
      assignedPaths[thepath] = (
        Object.keys(assignedPaths).length + 1
      ).toString();
      setCurrentPoll(
        pollquestions.filter(
          (poll) =>
            poll.id === (Object.keys(assignedPaths).length + 1).toString()
        )[0]
      );
    }
    console.log("assignedPaths:", assignedPaths);
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
