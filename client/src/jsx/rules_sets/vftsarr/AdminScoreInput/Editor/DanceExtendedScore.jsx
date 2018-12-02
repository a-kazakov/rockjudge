import {React} from "HostModules";

import GeneralEditor from "./GeneralEditor"
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import PT from "prop-types";

export default class DanceExtendedScore extends React.Component {
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
                    field="fw_woman"
                    label="FW"
                />
                <ReductionBlock
                    nullable
                    field="fw_man"
                    label="FM"
                />
                <NumberBlock
                    nullable
                    field="df_accuracy"
                    label="DF-Pr"
                    max={ 5 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="df_complexity"
                    label="DF-C"
                    max={ 4 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="df_art"
                    label="DF-A"
                    max={ 1 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="c_idea"
                    label="C-I"
                    max={ 5 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="c_performance"
                    label="C-P"
                    max={ 4 }
                    step={ 0.5 }
                />
                <NumberBlock
                    nullable
                    field="c_bonus"
                    label="C-B"
                    max={ 1 }
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

