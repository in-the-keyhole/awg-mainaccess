import { MainAccessPage } from '@awg/mainaccess-web-ui-lib';

import styles from './App.module.scss';

export function App() {
    return (
        <div className={styles['main-page']}>
            <MainAccessPage />
        </div>
    );
}

export default App;
