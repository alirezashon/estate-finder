import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PostAd from './components/Ads'
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div >testome</div>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/postad" element={<PostAd />} />
                {/* <Route path="/ad/:id" element={<AdDetail />} /> */}

            </Routes>
        </Router>
    );
};

export default App;

  
