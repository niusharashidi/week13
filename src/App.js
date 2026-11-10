import Tabs from "./components/Tabs";
import "./App.css";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis ante augue. Phasellus volutpat neque ac dui mattis vulputate. Etiam consequat aliquam cursus. In sodales pretium ultrices. Maecenas lectus est, sollicitudin consectetur felis nec, feugiat ultricies mi.";

const TABS = [1, 2, 3, 4].map((n) => ({
  id: `tab${n}`,
  title: `Tab ${n}`,
  heading: `Content ${n}`,
  content: LOREM,
}));

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Tabs Component with React</h1>
      </header>
      <Tabs tabs={TABS} />
    </div>
  );
}

export default App;