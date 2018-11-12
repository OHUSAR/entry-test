import * as React from 'react';
import {ComplaintsTableFragment} from './complaints-table.graphql';
import styles from './complaints-table.module.css';


// export interface Props extends ComplaintsTableFragment{
//
// }

class Complaints extends React.Component{
    render() {
        return(
            <div className={styles.test}>
                Testa
            </div>
        );
    };
}

export default Complaints;