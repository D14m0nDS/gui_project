import React, { useState, useEffect } from "react";
import { F1Api } from "../services/api";

export default function Drivers() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                // Default to 'current' which your backend treats as 2024
                const data = await F1Api.getAllDrivers("current");
                setDrivers(data);
            } catch (err) {
                setError(err.message || "Failed to load drivers");
            } finally {
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-20 h-20 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-4 text-red-500 bg-gray-50 dark:bg-gray-900">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
            <div className="container w-full p-4 bg-gray-100 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                        2024 F1 Drivers
                    </h1>
                </div>

                {/* Grid of driver cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {drivers.map((driver) => {
                        // Build the constructor logo URL based on constructor_id
                        const constructorLogoUrl = F1Api.getConstructorImage(driver.constructor_id);

                        return (
                            <div
                                key={driver.id}
                                className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                                {/* Driver headshot on the left */}
                                <img
                                    src={driver.headshot_url}
                                    alt={driver.name}
                                    className="w-32 h-32 object-cover md:w-36 md:h-36"
                                />

                                {/* Driver details in the middle (flex-1 so it expands) */}
                                <div className="p-4 flex flex-col justify-center flex-1">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                        {driver.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Age: <span className="font-medium">{driver.age}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Nationality:{" "}
                                        <span className="font-medium">{driver.nationality}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Driver Number:{" "}
                                        <span className="font-medium">{driver.number}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Constructor:{" "}
                                        <span className="font-medium">{driver.constructor_name}</span>
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                        Points: <span className="font-medium">{driver.points}</span>
                                    </p>
                                </div>

                                {/* Constructor logo on the right */}
                                <div className="flex items-center justify-center p-2">
                                    <img
                                        src={constructorLogoUrl}
                                        alt={driver.constructor_name}
                                        className="w-30 h-30 object-contain p-1"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
