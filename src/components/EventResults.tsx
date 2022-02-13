
import { Events } from '../Models/TicketResponse'

export function EventResults(props: {events: Events}){


        return(

            <div>

                <h1> Events happening close to your destination</h1>
                
                <h2>{props.events.name}</h2>
                <p>{props.events.dates}</p>
                <p>{props.events.url}</p>


            </div>
        )
}