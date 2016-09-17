export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            active: PT.bool.isRequired,
            level: PT.number,
            mkey: PT.any.isRequired,
            title: PT.string.isRequired,
            onClick: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            level: 1,
        };
    }

    handleClick = () => {
        this.props.onClick(this.props.mkey);
    }

    getClassName() {
        let result = `level-${this.props.level}`;
        if (this.props.active) {
            result += " active";
        }
        return result;
    }
    render() {
        return (
            <div className="block">
                <div
                    className={ this.getClassName() }
                    onClick={ this.handleClick }
                >
                    { this.props.title }
                </div>
            </div>
        );
    }
}

Item.displayName = "AdminPanel_Management_SideMenu_Item";
