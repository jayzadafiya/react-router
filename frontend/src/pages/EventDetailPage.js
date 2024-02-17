import React, { Suspense } from 'react'
import { json, redirect, useLoaderData, useParams, useRouteLoaderData, defer, Await } from 'react-router-dom'
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { getAuthToken } from '../util/auth';

function EventDetailPage() {
    // const data = useRouteLoaderData('event-details');
    // return (
    //     <>
    //         <EventItem event={data.event} />
    //         <EventsList events={data} />
    //     </>
    // )

    const { event, events } = useRouteLoaderData('event-details');

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading</p>}>
                <Await resolve={event}>
                    {loadEvent => <EventItem event={loadEvent} />}
                </Await>
            </Suspense >

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading</p>}>
                <Await resolve={events}>
                    {loadEvent => <EventsList events={loadEvent} />}
                </Await>
            </Suspense >
        </>
    )
}

export default EventDetailPage

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


async function loadEvent(id) {

    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        return json(
            { message: 'Could not fetch details for selected event.' }, { status: 500 }
        )
    }
    else {
        const resData = await response.json();
        console.log(resData)
        return resData.event;
    }
}
export async function loader({ request, params }) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents(),
    })
}

export async function action({ request, params }) {
    const id = params.eventId;
    const token = getAuthToken();
    console.log(token)
    const response = await fetch('http://localhost:8080/events/' + id, {
        method: request.method,
        headers: {
            'Authorization': 'Bearer ' + token

        }
    });

    if (!response.ok) {
        return json(
            { message: 'Could not delete  selected event.' }, { status: 500 }
        )
    }

    return redirect('/events')
}   
