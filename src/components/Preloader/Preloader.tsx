import preload from '../../assets/Eclipse-1s-211px.svg';
import styles from './Preloader.module.css';

export const Preloader = () => {
    return <div className={styles.preloader}>
        <img alt={'preloader'} src={preload}/>
    </div>
}