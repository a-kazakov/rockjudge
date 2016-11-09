import Api from "common/server/Api";

import EditorRow from "./EditorRow";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            error: PT.bool.isRequired,
            item: PT.shape({
                id: PT.number.isRequired,
                sp: PT.number.isRequired,
                estimated_beginning: PT.string.isRequired,
                estimated_duration: PT.string.isRequired,
                verbose_name: PT.string.isRequired,
                tour_id: PT.number,
            }).isRequired,
            tours: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                    discipline_name: PT.string.isRequired,
                    tour_name: PT.string.isRequired,
                }).isRequired
            ).isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    handleStartEditing = () => this.setState({ editing: true });
    handleStopEditing = () => this.setState({ editing: false });

    handleSubmission = (data) => {
        Api("competition_plan_item.set", {
            competition_plan_item_id: this.props.item.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    handleDeletion = (event) => {
        event.stopPropagation();
        Api("competition_plan_item.delete", {
            competition_plan_item_id: this.props.item.id,
        })
            .send();
    }

    getClassName() {
        let result = "viewer";
        if (this.props.error) {
            result += " error";
        }
        return result;
    }
    renderName() {
        if (this.props.item.verbose_name) {
            return (
                <td colSpan="2">
                    <b>{ this.props.item.verbose_name }</b>
                </td>
            );
        }
        const tour = this.props.tours.find(t => t.id === this.props.item.tour_id);
        if (!tour) {
            return (
                <td colSpan="2" />
            );
        }
        return [
            <td key="D">
                { tour.discipline_name }
            </td>,
            <td key="T">
                { tour.tour_name }
            </td>,
        ];
    }
    renderEditor() {
        return (
            <EditorRow
                onStopEditing={ this.handleStopEditing }
                onSubmit={ this.handleSubmission }
                { ...this.props }
            />
        );
    }
    renderViewer() {
        return (
            <tr
                className={ this.getClassName() }
                onClick={ this.handleStartEditing }
            >
                <td className="sp">
                    { this.props.item.sp }
                </td>
                { this.renderName() }
                <td className="estimated_beginning">
                    { this.props.item.estimated_beginning }
                </td>
                <td className="estimated_duration">
                    { this.props.item.estimated_duration }
                </td>
                <td className="delete">
                    <button onClick={ this.handleDeletion }>
                        X
                    </button>
                </td>
            </tr>
        );
    }
    render() {
        if (this.state.editing) {
            return this.renderEditor();
        } else {
            return this.renderViewer();
        }
    }
}

Row.displayName = "AdminPanel_Management_CompetitionPlan_Row";
