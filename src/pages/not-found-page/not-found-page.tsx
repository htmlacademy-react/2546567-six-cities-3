import { Link } from "react-router-dom";
import styles from './styles.module.css'

function NotFoundPage(): JSX.Element {
  return (
    <div className={styles.wrapper404}>
      <h1 className={styles.wrapperTitle}>
        404.Page not Found
      </h1>
      <Link className={styles.link} to={'/'}>--- На главную ---</Link>
    </div>
  );
}

export default NotFoundPage;
