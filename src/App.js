import * as React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

export default function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Jobs />} />
            <Route path="/job-details" element={<JobDetails />} />
        </Routes>
    </Router>
  );
}
