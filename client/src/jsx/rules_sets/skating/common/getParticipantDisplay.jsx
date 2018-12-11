import { React } from "HostModules";

export default function getParticipantDisplay(participant) {
    // eslint-disable-line react/display-name
    if (participant.formation_name !== "") {
        return <p style={{ margin: "0" }}>{participant.formation_name}</p>;
    }
    return participant.sportsmen.map((s, idx) => (
        <p key={idx} style={{ margin: "0" }}>
            {`${s.last_name} ${s.first_name}`}
        </p>
    ));
}
