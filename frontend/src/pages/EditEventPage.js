// import React from 'react'
// import EventForm from '../components/EventForm'
// import { useLoaderData, useRouteLoaderData } from 'react-router-dom'

// function EditEventPage() {
//     const data = useRouteLoaderData('event-details');

//     return (
//         <>
//             <EventForm method='patch' event={data.event} />
//         </>
//     )
// }

// export default EditEventPage

import { useRouteLoaderData } from 'react-router-dom';

import EventForm from '../components/EventForm';

function EditEventPage() {
    const { event } = useRouteLoaderData('event-details');
    console.log('edit', event)
    return <EventForm method="patch" event={event} />;
}

export default EditEventPage;