import {React} from "HostModules";

import HeatsOneParticipant from "./HeatsOneParticipant";

export default function HeatsFormation(props) {
    return (
        <HeatsOneParticipant
            showScore={ false }
            { ...props }
        />
    );
}

