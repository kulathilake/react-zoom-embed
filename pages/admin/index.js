import AddAttendees from "../../components/AddAttendee";
import CreateMeeting from "../../components/CreateMeeting";

export default function Admin(){
    return (
        <div>
            <section>
                <CreateMeeting/>
            </section>
            <section>
                <AddAttendees />
            </section>
        </div>
    )
}