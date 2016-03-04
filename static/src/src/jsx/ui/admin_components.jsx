import { _ } from "i10n/loader";
import { clone } from "common/tools";


export class DisciplinesControls extends React.Component {
    setAllDisciplines(value) {
        let config = clone(this.props.config);
        Object.keys(config.disciplines).forEach(key => {
            config.disciplines[key] = value;
        });
        this.props.onChange(config);
    }
    onDisciplineCbChange = (discipline_id, value) => {
        let config = clone(this.props.config);
        config.disciplines[discipline_id] = value;
        this.props.onChange(config);
    }
    onPropertyCbChange = (property_name, value) => {
        let config = clone(this.props.config);
        config[property_name] = value;
        this.props.onChange(config);
    }
    onSelectAllDisciplines = e => {
        e.preventDefault();
        this.setAllDisciplines(true);
    }
    onDeselectAllDisciplines = e => {
        e.preventDefault();
        this.setAllDisciplines(false);
    }
    render() {
        return (
            <div className="controls">
                <div className="row">
                    <div className="col-md-6">
                        { this.props.disciplines.map(d =>
                            <ControlsCheckbox
                                key={ d.id }
                                mkey={ d.id }
                                label={ d.name }
                                value={ this.props.config.disciplines[d.id] }
                                onChange={ this.onDisciplineCbChange } />
                        ) }
                        <a href="#" onClick={ this.onSelectAllDisciplines }>{ _("global.buttons.select_all") }</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="#" onClick={ this.onDeselectAllDisciplines }>{ _("global.buttons.deselect_all") }</a>
                    </div>
                    <div className="col-md-6">
                        { this.props.custom_controls.map(info =>
                            <ControlsCheckbox
                                key={ info.key }
                                mkey={ info.key }
                                label={ info.label }
                                value={ this.props.config[info.key] }
                                onChange={ this.onPropertyCbChange } />
                        ) }
                    </div>
                </div>
            </div>
        );
    }
}

class ControlsCheckbox extends React.Component {
    onChange = e => {
        this.props.onChange(this.props.mkey, e.target.checked);
    }
    render() {
        return (
            <div className="switch">
                <label>
                    <input
                        type="checkbox"
                        checked={ this.props.value }
                        onChange={ this.onChange } />
                    { this.props.label }
                </label>
            </div>
        );
    }
}
