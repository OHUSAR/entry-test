import * as React from 'react';
import { Checkbox } from '@rmwc/checkbox';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';

interface State{
    id: number;
}

interface Props extends State{
    name: string;
    state: boolean;
    comp: string;
    onChange: (id: number, comp: string) => void;
}

class ServerCheckbox extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <Checkbox
                checked={this.props.state}
                onChange={() => this.props.onChange(this.props.id, this.props.comp)}
                >
            {this.props.name}
            </Checkbox>
        );
    }
}

export default ServerCheckbox;
