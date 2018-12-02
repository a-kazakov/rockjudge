import {React} from "HostModules";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor"
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";

export default class FormationSimplifiedScore extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    render() {
        return (
            <GeneralEditor
                initialData={ this.props.scoreData }
                readOnly={ this.props.readOnly }
                onDiscard={ this.props.onDiscard }
                onSubmit={ this.props.onSubmit }
            >
                <ReductionBlock
                    nullable
                    field="fw"
                    label="FW"
                />
                <NumberBlock
                    nullable
                    field="dance_figs"
                    label="DF"
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="composition"
                    label="C"
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="figures"
                    label="F"
                    step={ 0.5 }
                />
                <NumberBlock
                    field="small_mistakes"
                    label="SM"
                    max={ 100 }
                />
                <NumberBlock
                    field="big_mistakes"
                    label="BM"
                    max={ 100 }
                />
            </GeneralEditor>
        );
    }
}

