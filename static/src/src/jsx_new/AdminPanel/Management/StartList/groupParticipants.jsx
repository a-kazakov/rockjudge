import clone from "common/tools/clone";

function groupParticipants(competition, config) {
    if (config.group_by_clubs) {
        let clubs = clone(competition.clubs);
        let disciplines = clone(competition.disciplines);
        let grouped = {}
        disciplines.forEach(discipline => {
            if (!config.disciplines[discipline.id]) {
                return;
            }
            discipline.participants.forEach(participant => {
                if (!config.clubs[participant.club.id]) {
                    return;
                }
                let club_id = participant.club.id;
                if (!(club_id in grouped)) {
                    grouped[club_id] = [];
                }
                participant.discipline = discipline;
                grouped[club_id].push(participant);
            });
        });
        clubs.forEach(club => {
            club.participants = grouped[club.id]
        });
        return clubs.filter(club => club.participants);
    } else {
        let disciplines = clone(competition.disciplines);
        disciplines = disciplines.filter(discipline => config.disciplines[discipline.id]);
        disciplines.forEach(discipline => {
            discipline.participants = discipline.participants.filter(participant => config.clubs[participant.club.id]);
        });
        return disciplines.filter(discipline => discipline.participants.length > 0);
    }
}

export default groupParticipants;
