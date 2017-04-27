import makeClassName from "common/makeClassName";


export default class Button extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            mkey: PT.any,
            style: PT.oneOf(["red", "dark"]),
            text: PT.string.isRequired,
            onClick: PT.func.isRequired,
        };
    }

    handleClick = (event) => {
        event.stopPropagation();
        this.props.onClick(this.props.mkey);
    }

    getClassName() {
        return makeClassName({
            "red": this.props.style === "red",
            "dark": this.props.style === "dark",
        });
    }
    render() {
        return (
            <button
                className={ this.getClassName() }
                onClick={ this.handleClick }
            >
                { this.props.text }
            </button>
        );
    }
}

Button.displayName = "pages_AdminPanel_Judging_TourPanel_ScoresTab_Row_ActionsCell_Button";
