export default function getParticipantDisplay(participant) { // eslint-disable-line react/display-name
    if (participant.formation_name !== "") {
        return (
            <p>
                { participant.formation_name }
            </p>
        );
    }
    return participant.sportsmen.map((s, idx) =>
        <p key={ idx }>
            { `${s.last_name} ${s.first_name}` }
        </p>
    );
}
