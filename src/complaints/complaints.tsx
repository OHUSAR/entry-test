import * as React from 'react';
import { Query } from 'react-apollo';
import query, { ComplaintsQuery } from './complaints.graphql';
import ServerSelect from './server-select/server-select'
import styles from './complaints.module.css';

class Complaints extends React.Component {
    render() {
        return (
            <div className={styles.test}>
                <ServerSelect />
            </div>
        );
    };
}

export default Complaints;
