import React, { useState } from 'react';

const CalculateJourney: React.FC = () => {
    const [FromPostcode, setFromPostcode] = useState<string>('');
    const [ToPostCode, SetToPostCode] = useState<string>('');
    
    const [journeyInfo, setJourneyInfo] = useState<{ time: string, distance: string } | null>(null);
    
    const [error, setError] = useState<string>('');

    const handleCalculateJourney = async () => {
        if (!FromPostcode || !ToPostCode) {
            setError('Please enter both postcodes.');
            return;
        }

        const route = `${FromPostcode},${ToPostCode}`;
        try {
            const response = await fetch(`https://media.carecontrolsystems.co.uk/Travel/JourneyPlan.aspx?Route=${route}`);
            const data = await response.text();

            if (data.includes(',')) {
                const [time, distance] = data.replace(';', '').split(',');
                setJourneyInfo({ time, distance });
                setError('');
            } else {
                setJourneyInfo(null);
                setError('Invalid postcodes or unable to fetch journey details.');
            }
        } catch (error) {
            setJourneyInfo(null);
            setError('An error occurred while fetching the journey details.');
        }
    };

    return (
        <>
            <h1>Journey Planner</h1>
            <div>
                <input
                    type="text"
                    value={FromPostcode}
                    onChange={(e) => setFromPostcode(e.target.value)}
                    placeholder="Enter first postcode"
                />
                <input
                    type="text"
                    value={ToPostCode}
                    onChange={(e) => SetToPostCode(e.target.value)}
                    placeholder="Enter second postcode"
                />
                <button onClick={handleCalculateJourney}>Calculate Journey</button>
            </div>
            {error && <p className="error">{error}</p>}
            {journeyInfo && (
                <div>
                    <p>Travel Time: {journeyInfo.time} minutes</p>
                    <p>Distance: {journeyInfo.distance} miles</p>
                </div>
            )}
        </>
    );
};

export default CalculateJourney;
