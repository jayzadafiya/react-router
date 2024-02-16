import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { useLoaderData, json } from 'react-router-dom';

function EventsPage() {
    // const [isLoading, setIsLoading] = useState(false);
    // const [fetchedEvents, setFetchedEvents] = useState();
    // const [error, setError] = useState();
    // //2
    const events = useLoaderData()

    useEffect(() => {
        async function fetchEvents() {
            // setIsLoading(true);
            // const response = await fetch('http://localhost:8080/events');

            // if (!response.ok) {
            //     setError('Fetching events failed.');
            // } else {
            //     const resData = await response.json();
            //     setFetchedEvents(resData.events);
            // }
            // setIsLoading(false);
        }

        fetchEvents();
    }, []);
    return (
        <>
            {/* <div style={{ textAlign: 'center' }}>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
            </div>
            {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}

            {/* 2  useLoaderData use in eventList page */}

            <EventsList events={events} />
            {/* <EventsList /> */}
        </>
    );
}

export default EventsPage;

export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' }
        // throw new Response(JSON.stringify({
        //     message: 'Could not fetch events.',
        //     status: 500
        // })
        // )

        return json(
            { message: 'Could not fetch events.' },
            { status: 500 }
        )
    } else {
        const resData = await response.json();
        return resData.events;
    }
}