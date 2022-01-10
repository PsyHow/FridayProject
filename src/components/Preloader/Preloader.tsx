import preload from '../../assets/Pulse-1s-200px.svg';
import styles from './Preloader.module.css';

export const Preloader = () => {
    return <div className={styles.preloader}>
        <img alt={'preloader'} src={preload}/>
    </div>
}