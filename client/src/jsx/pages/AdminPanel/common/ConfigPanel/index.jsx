import CheckboxesSet from "./CheckboxesSet";
import OneCheckbox from "./OneCheckbox";

export default class ConfigPanel extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            clubs: PT.arrayOf(PT.object.isRequired),
            config: PT.shape({
                clubs: PT.object,
                disciplines: PT.object,
            }).isRequired,
            customControls: PT.arrayOf(
                PT.shape({
                    key: PT.string.isRequired,
                    label: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            disciplines: PT.arrayOf(PT.object.isRequired).isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleChange = (field, value) => {
        let config = Object.assign({}, this.props.config);
        config[field] = value;
        this.props.onChange(config);
    }

    renderClubs() {
        if (!this.props.clubs) {
            return null;
        }
        return (
            <div>
                <CheckboxesSet
                    items={ this.props.clubs }
                    mkey="clubs"
                    values={ this.props.config.clubs }
                    onChange={ this.handleChange }
                />
                <div className="spacer" />
            </div>
        );
    }
    renderDisciplines() {
        if (!this.props.disciplines) {
            return null;
        }
        return (
            <CheckboxesSet
                items={ this.props.disciplines }
                mkey="disciplines"
                values={ this.props.config.disciplines }
                onChange={ this.handleChange }
            />
        );
    }
    render() {
        return (
            <div className="ConfigPanel">
                <div className="part">
                    { this.renderDisciplines() }
                </div>
                <div className="part">
                    { this.renderClubs() }
                    { this.props.customControls.map(info =>
                        <OneCheckbox
                            key={ info.key }
                            label={ info.label }
                            mkey={ info.key }
                            value={ this.props.config[info.key] }
                            onChange={ this.handleChange }
                        />
                    ) }
                </div>
            </div>
        );
    }
}

ConfigPanel.displayName = "AdminPanel_components_ConfigPanel";
