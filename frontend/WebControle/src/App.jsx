import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './pages/Principal.jsx'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Principal />} />
      </Routes>
    </Router>
  )
}


