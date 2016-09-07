export default class NavigationButton extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            mkey: PT.string.isRequired,
            title: PT.string.isRequired,
            onClick: PT.func.isRequired,
        }
    }
    getClassName() {
        let result = "button";
        if (this.props.active) {
            result += " active";
        }
        return result;
    }
    handleClick = () => {
        this.props.onClick(this.props.mkey);
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                onClick={ this.handleClick }
            >
                <div className="icon">
                    { this.props.title[0] }
                </div>
                <div className="label">
                    { this.props.title }
                </div>
            </div>
        );
    }
}

NavigationButton.displayName = "AdminPanel_NavigationButton";
