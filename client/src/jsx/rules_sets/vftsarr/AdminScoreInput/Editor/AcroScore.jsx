import {React} from "HostModules";

import GeneralEditor from "./GeneralEditor"
import checkSS from "common/checkSS";
import range from "common/range";
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";
import PT from "prop-types";

export default class DanceScore extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    render() {
        const ssn = this.props.scoringSystemName;
        const acro_count = checkSS(ssn, "acro_6") ? 6 : checkSS(ssn, "acro_8") ? 8 : 5;
        return (
            <GeneralEditor
                initialData={ this.props.scoreData }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.props.onSubmit }
            >
                { range(1, acro_count + 1).map(idx => (
                    <ReductionBlock
                        nullable
                        field={ `a${idx}` }
                        key={ idx }
                        label={ `A${idx}` }
                    />
                )) }
            </GeneralEditor>
        );
    }
}

