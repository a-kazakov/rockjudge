import _ from "l10n";

import ElementRow from "./ElementRow";

export default class Elements extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            elements: PT.arrayOf(PT.shape({
                description: PT.string.isRequired,
                score: PT.number.isRequired,
            })).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            elements: this.props.elements,
        };
    }

    handleElementChange = (idx, value) => {
        this.changeElements(elements => {
            elements[idx] = value;
            return elements;
        });
    }
    handleElementAddition = () => {
        this.changeElements(elements => {
            elements.push({
                description: "",
                score: "0",
            });
            return elements;
        });
    }
    handleElementDeletion = (idx) => {
        this.changeElements(elements => {
            elements.splice(idx, 1);
            return elements;
        });
    }

    changeElements(func) {
        let elements = this.state.elements.slice(); // clone
        elements = func(elements);
        this.setState({ elements });
    }
    load(data) {
        this.setState({
            elements: data.map(e => ({
                description: e[0],
                score: e[1],
            })),
        });
    }
    serialize() {
        return this.state.elements.map(element => ({
            description: element.description,
            score: parseFloat(element.score) || 0,
        }));
    }
    render() {
        return (
            <div className="elements">
                { this.state.elements.map((element, idx) =>
                    <ElementRow
                        element={ element }
                        idx={ idx }
                        key={ idx }
                        onChange={ this.handleElementChange }
                        onDelete={ this.handleElementDeletion }
                    />
                ) }
                <button
                    className="add-element-button"
                    type="button"
                    onClick={ this.handleElementAddition }
                >
                    { _("admin.buttons.add_element") }
                </button>
            </div>
        );
    }
}

Elements.displayName = "AdminPanel_Management_Participants_EditorRow_Programs_Editor_Elements";
