export default class SplashScreen extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                name: PT.string.isRequired,
            }).isRequired,
        };
    }
    render() {
        return (
            <div className="SplashScreen">
                <h1>
                    { this.props.competition.name }
                </h1>
            </div>
        );
    }
}

SplashScreen.displayName = "SplashScreen";
