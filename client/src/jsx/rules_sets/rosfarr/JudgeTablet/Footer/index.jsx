import Button from "./Button";

export default function Footer(props) {
    return (
        <footer>
            { React.Children.map(props.children, (btn) =>
                <Button
                    key={ btn.props.mkey }
                    active={ props.value === btn.props.mkey }
                    onClick={ props.onChange }
                    { ...btn.props }
                />
            )}
        </footer>
    )
}
