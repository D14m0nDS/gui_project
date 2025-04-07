import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Standings from './pages/Standings'
import Drivers from './pages/Drivers'
import Constructors from './pages/Constructors'
import RaceDetails from './pages/RaceDetails'
import DriverDetails from './pages/DriverDetails'
import ConstructorDetails from './pages/ConstructorDetails'
import Navbar from './components/Layout/Navbar'

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/standings" element={<Standings />} />
                    <Route path="/drivers" element={<Drivers />} />
                    <Route path="/constructors" element={<Constructors />} />
                    <Route path="/races/:raceId" element={<RaceDetails />} />
                    <Route path="/drivers/:driverId" element={<DriverDetails />} />
                    <Route path="/constructors/:constructorId" element={<ConstructorDetails />} />
                </Routes>
            </Router>
        </div>
    )
};