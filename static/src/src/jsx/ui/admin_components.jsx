import _ from "l10n";
import { clone } from "common/tools";


export class DisciplinesControls extends React.Component {
    onChange = (property_name, value) => {
        let config = clone(this.props.config);
        config[property_name] = value;
        this.props.onChange(config);
    }
    renderClubs() {
        if (!this.props.clubs) {
            return null;
        }
        return (
            <div>
                <CheckboxesSet
                    mkey="clubs"
                    items={ this.props.clubs }
                    values={ this.props.config.clubs }
                    onChange={ this.onChange } />
                <div className="spacer"></div>
            </div>
        );
    }
    render() {
        return (
            <div className="controls">
                <div className="row">
                    <div className="col-md-6">
                        <CheckboxesSet
                            mkey="disciplines"
                            items={ this.props.disciplines }
                            values={ this.props.config.disciplines }
                            onChange={ this.onChange } />
                    </div>
                    <div className="col-md-6">
                        { this.renderClubs() }
                        { this.props.custom_controls.map(info =>
                            <ControlsCheckbox
                                key={ info.key }
                                mkey={ info.key }
                                label={ info.label }
                                value={ this.props.config[info.key] }
                                onChange={ this.onChange } />
                        ) }
                    </div>
                </div>
            </div>
        );
    }
}

class CheckboxesSet extends React.Component {
    setAll(value) {
        let new_values = clone(this.props.values);
        Object.keys(new_values).forEach(key => {
            new_values[key] = value;
        });
        this.props.onChange(this.props.mkey, new_values);
    }
    onCbChange = (id, value) => {
        let new_values = clone(this.props.values);
        new_values[id] = value;
        this.props.onChange(this.props.mkey, new_values);
    }
    onSelectAll = (e) => {
        e.preventDefault();
        this.setAll(true);
    }
    onDeselectAll = (e) => {
        e.preventDefault();
        this.setAll(false);
    }
    render() {
        return (
            <div>
                { this.props.items.map(x =>
                    <ControlsCheckbox
                        key={ x.id }
                        mkey={ x.id }
                        label={ x.name }
                        value={ this.props.values[x.id] }
                        onChange={ this.onCbChange } />
                ) }
                <a href="#" onClick={ this.onSelectAll }>{ _("global.buttons.select_all") }</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" onClick={ this.onDeselectAll }>{ _("global.buttons.deselect_all") }</a>
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
