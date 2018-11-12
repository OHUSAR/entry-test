import * as React from 'react';
import { Checkbox } from '@rmwc/checkbox';
import '@material/checkbox/dist/mdc.checkbox.css';
import '@material/form-field/dist/mdc.form-field.css';
import defaultStyles from './server-select.module.css';
import ServerCheckbox from './server-checkbox/server-checkbox';

interface StateServerSelect {
    networks: Array<StateServer>;
    jaga: Array<StateServer>;
    [key: string]: Array<StateServer>;
}

interface StateServer{
    name: string;
    state: boolean;
}

interface serverCategories{
    networks: Array<string>;
    jaga: Array<string>;
    [key: string]: Array<string>;
}

const exampleValues: serverCategories = {
    networks: ['zahrada', 'modraStrecha'],
    jaga: ['zahrada', 'modraStrecha'],
}

class ServerSelect extends React.PureComponent<any, StateServerSelect> {
    constructor(props: any) {
        super(props);
        const state: any = {};
        for (const obj in exampleValues) {
            const server: StateServer[] = [];
            exampleValues[obj.toString()].forEach((element: string) => {
                const s: StateServer = {
                    name: element,
                    state: false,
                };
                server.push(s);
            });
            state[obj] = server;
        };
        this.state = state as StateServerSelect;
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    
    onChangeHandler(id: number, comp: string) {
        const server: StateServer[] = this.state[comp];
        server[id].state = !server[id].state;
        this.setState({ [comp]: server.slice() });
    }

    onChange(event: any) {
        if (!this.state[event.target.name].some((site: StateServer) => site.state)) {
            const server: StateServer[] = this.state[event.target.name];
            for (const site in server) {
                server[site].state = true;
            }
            this.setState({ [event.target.name]: server.slice() });
        } else {
            const server: StateServer[] = this.state[event.target.name];
            for (const site in server) {
                server[site].state = false;
            }
            this.setState({ [event.target.name]: server.slice() });
        }
    }

    render() {
        return (
            <form>
                <Checkbox
                    name="networks"
                    indeterminate={
                        this.state.networks.some((site: StateServer) => site.state) &&
                        !this.state.networks.every((site: StateServer) => site.state)
                    }
                    checked={ this.state.networks.every((site: StateServer) => site.state) }
                    onChange={ this.onChange }
                    >
                4Networks
                </Checkbox>
                <div className={defaultStyles.serverNames}>
                    {this.state.networks.map((element, index) => (
                        <ServerCheckbox
                            key={index}
                            name={element.name}
                            id={index}
                            state={element.state}
                            comp={"networks"}
                            onChange={this.onChangeHandler}
                            />
                    ))}
                </div>
                <Checkbox
                    name="jaga"
                    indeterminate={
                        this.state.jaga.some((site: StateServer) => site.state) &&
                        !this.state.jaga.every((site: StateServer) => site.state)
                    }
                    checked={this.state.jaga.every((site: StateServer) => site.state)}
                    onChange={this.onChange}
                    >
                JAGA
                </Checkbox>
                <div className={defaultStyles.serverNames}>
                    {this.state.jaga.map((element, index) => (
                        <ServerCheckbox
                            key={index}
                            name={element.name}
                            id={index}
                            state={element.state}
                            comp={"jaga"}
                            onChange={this.onChangeHandler}
                            />
                    ))}
                </div>
            </form>
        );
    };
}

export default ServerSelect;
