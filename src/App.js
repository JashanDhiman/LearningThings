import { Route, Routes } from "react-router";
import TestingApiTime from "./components/TestingApiTime";
//import Form from "./components/useReducer/Form";
// import Redux from "./components/redux/Redux";
// import Reducer from "./components/useReducer";
// import DependencyMistake from "./components/useEffect/DependencyMistake";

function App() {
    return (
        <Routes>
            {/* <Route path="/" element={<DependencyMistake />} /> */}
            {/* <Route path="/" element={<Redux />} /> */}
            {/* <Route path="/" element={<Reducer />} /> */}
            {/*<Route path="/" element={<Form />} />*/}
            <Route path="/" element={<TestingApiTime />} />
        </Routes>
    );
}

export default App;
