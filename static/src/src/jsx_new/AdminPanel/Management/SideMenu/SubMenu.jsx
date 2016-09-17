export default class SubMenu extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            children: PT.node.isRequired,
            id: PT.string.isRequired,
            title: PT.string.isRequired,
        };
    }
    isOpen() {
        return !!Number(sessionStorage.getItem(this.props.id));
    }
    setOpenState(open) {
        sessionStorage.setItem(this.props.id, open ? 1 : 0);
    }
    handleClick = (e) => {
        this.setOpenState(!e.target.parentNode.open);
    }
    render() {
        return (
            <details
                className="block"
                open={ this.isOpen() }
            >
                <summary
                    className="level-1"
                    onClick={ this.handleClick }
                >
                    { this.props.title }
                </summary>
                { this.props.children }
            </details>
        );
    }
}

SubMenu.displayName = "AdminPanel_Management_SideMenu_SubMenu";
