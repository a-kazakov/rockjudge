import { _ } from "i10n/loader";
import { Loader } from "ui/components";


export class AutoPrinterStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            available: null,
        };
    }
    componentDidMount() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:5949", true);
        xhr.onload = () => this.setState({ available: true });  //eslint-disable-line react/no-did-mount-set-state
        xhr.onerror = () => this.setState({ available: false });  //eslint-disable-line react/no-did-mount-set-state
        xhr.send();
    }
    render() {
        if (this.state.available === null) {
            return <Loader />
        }
        if (!this.state.available) {
            return <div className="alert alert-danger">
                <p>{ _("admin.alerts.auto_printer_not_available") }</p>
            </div>
        }
        return <div className="alert alert-success">
            <p>{ _("admin.alerts.auto_printer_available") }</p><br />
            <button className="btn btn-default"
                    type="button"
                    onClick={ () => window.printer_window ? window.printer_window.focus() :
                        (window.printer_window = window.open(`/printer/${ this.props.competition_id }`,
                            "printer", "resizable=yes,location=no")) }>
                { _("admin.buttons.launch_auto_printer") }
            </button>
        </div>
    }
}
