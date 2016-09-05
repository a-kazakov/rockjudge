import { Api } from "server/api";

import InputForm from "./InputForm";

export default class Creator extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            afterId: PT.number,
            competition: PT.object.isRequired,
            disciplineId: PT.number.isRequired,
            onStopEditing: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            afterId: null,
        }
    }
    handleSubmission = (data) => {
        Api("tour.create", {
            discipline_id: this.props.disciplineId,
            add_after: this.props.afterId,
            data: data,
        })
            .onSuccess(this.props.onStopEditing)
            .send();
    }
    render() {
        return (
            <InputForm
                classes={ ["tour-create"] }
                competition={ this.props.competition }
                onStopEditing={ this.props.onStopEditing }
                onSubmit={ this.handleSubmission }
            />
        )

    }
}

Creator.displayName = "AdminPanel_Management_Tours_Creator";
