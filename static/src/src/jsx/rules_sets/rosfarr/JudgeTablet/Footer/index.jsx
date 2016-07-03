import Button from "./Button";

export default function Footer(props) {
    return (
        <div className="footer page-selector">
            { React.Children.map(props.children, (btn) =>
                <Button
                    key={ btn.props.mkey }
                    onClick={ props.onChange }
                    active={ props.value === btn.props.mkey }
                    { ...btn.props } />
            )}
        </div>
    )
}
