import React from 'react'
import EventForm from '../components/EventForm'
import { useLoaderData, useRouteLoaderData } from 'react-router-dom'

function EditEventPage() {
    const data = useRouteLoaderData('event-details');

    return (
        <>
            <EventForm event={data.event} />
        </>
    )
}

export default EditEventPage
