import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import Home from './pages/Portal/Home'
import Sedes from './pages/Portal/Sedes'
import Dashboard from './pages/Dashboard/Dashboard'
import KumiteScoreboard from './pages/Tournament/KumiteScoreboard'
import KumiteProjection from './pages/Tournament/KumiteProjection'
import { TournamentProvider } from './context/TournamentContext'

function App() {
    return (
        <div className="min-h-screen bg-white dark:bg-byakko-black text-gray-900 dark:text-gray-100 font-sans">
            <Routes>
                {/* Main Layout Routes */}
                <Route path="/*" element={
                    <>
                        <Navbar />
                        <main>
                            <TournamentProvider>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/sedes" element={<Sedes />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/kumite" element={<KumiteScoreboard />} />
                                </Routes>
                            </TournamentProvider>
                        </main>
                        <footer className="bg-gray-900 text-white py-8 text-center mt-auto">
                            <p className="mb-2">© 2025 Karate Do Byakko. Todos los derechos reservados.</p>
                            <p className="text-sm text-gray-500">Desarrollado por Nelson Figueroa Albarrán 1° Dan Karate Do Byakko Yuzenkai Chile</p>
                        </footer>
                    </>
                } />

                {/* Standalone Projection Route */}
                <Route path="/kumite/view" element={<KumiteProjection />} />
            </Routes>
        </div>
    )
}

export default App
