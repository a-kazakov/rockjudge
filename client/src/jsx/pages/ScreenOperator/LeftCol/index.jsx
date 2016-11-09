import Item from "./Item";

export default class LeftCol extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activeScreenId: PT.string,
            manifest: PT.shape({
                raw_data: PT.shape({
                    screens: PT.arrayOf(
                        PT.shape({}).isRequired,
                    ).isRequired,
                }).isRequired,
            }).isRequired,
            onScreenChange: PT.func.isRequired,
        };
    }

    render() {
        return (
            <div className="left-col">
                { this.props.manifest.raw_data.screens.map(screen_data =>
                    <Item
                        active={ screen_data.id === this.props.activeScreenId }
                        key={ screen_data.id }
                        screenData={ screen_data }
                        onScreenChange={ this.props.onScreenChange }
                    />
                ) }
            </div>
        );
    }
}

LeftCol.displayName = "ScreenOperator_LeftCol";
