import React from 'react'

export default function Home() {
    const races = [{ id: 1, name: 'Bahrain GP', date: '2023-03-05' }]

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">2023 F1 Races</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {races.map(race => (
                    <div key={race.id} className="p-4 border rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{race.name}</h2>
                        <p className="text-gray-600">{race.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

