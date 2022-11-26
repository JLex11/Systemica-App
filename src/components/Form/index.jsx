import clsx from 'clsx';
import { memo, useCallback, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import styles from './form.module.css';

const Form = ({ children, onSubmit, onClose, submitButtonLabel = 'aceptar', titulo, floating = true }) => {
  const [closing, setClosing] = useState(false);

  /* useHotkeys('esc', () => handleCloseClick()); */

  const handleCloseClick = useCallback(() => {
    if (!closing) {
      setClosing(true);
      setTimeout(() => onClose(), 300);
    }
  }, [closing]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSubmit(e);
    handleCloseClick();
  });

  const ContainerStyles = clsx(styles.ContainerForm, [
    floating && styles.ContainerFormFloating,
  ]);

  const FStyles = clsx(styles.Form, [
    closing && styles.Closing
  ]);

  return (
    <div className={ContainerStyles}>
      <form onSubmit={handleSubmit} className={FStyles}>
        <header className={styles.Header}>
          <h3 className={styles.Title}>{titulo}</h3>
          <button className={styles.Close} type='button' onClick={handleCloseClick}>
            <GrClose />
          </button>
        </header>
        {children}
        <footer className={styles.Footer}>
          <button type='submit' className={styles.SubmitButton}>
            {submitButtonLabel}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default memo(Form);