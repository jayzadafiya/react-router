import { Suspense, useEffect, useState } from 'react';

import EventsList from '../components/EventsList';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

function EventsPage() {
    // const [isLoading, setIsLoading] = useState(false);
    // const [fetchedEvents, setFetchedEvents] = useState();
    // const [error, setError] = useState();
    // //2
    // const events = useLoaderData()

    // useEffect(() => {
    //     async function fetchEvents() {
    //         // setIsLoading(true);
    //         // const response = await fetch('http://localhost:8080/events');

    //         // if (!response.ok) {
    //         //     setError('Fetching events failed.');
    //         // } else {
    //         //     const resData = await response.json();
    //         //     setFetchedEvents(resData.events);
    //         // }
    //         // setIsLoading(false);
    //     }

    //     fetchEvents();
    // }, []);

    // return (
    //     <>
    //         {/* <div style={{ textAlign: 'center' }}>
    //             {isLoading && <p>Loading...</p>}
    //             {error && <p>{error}</p>}
    //         </div>
    //         {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />} */}

    //         {/* 2  useLoaderData use in eventList page */}

    //         <EventsList events={events} />
    //         {/* <EventsList /> */}
    //     </>
    // );

    //defer return object data
    const { events } = useLoaderData()

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    )

}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return {isError: true, message: 'Could not fetch events.' }
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

export function loader() {
    // const response = await fetch('http://localhost:8080/events');

    // if (!response.ok) {
    //     // return {isError: true, message: 'Could not fetch events.' }
    //     // throw new Response(JSON.stringify({
    //     //     message: 'Could not fetch events.',
    //     //     status: 500
    //     // })
    //     // )

    //     return json(
    //         {message: 'Could not fetch events.' },
    //         {status: 500 }
    //     )
    // } else {
    //     const resData = await response.json();
    //     return resData.events;
    // }

    return defer({
        events: loadEvents()
    })
}