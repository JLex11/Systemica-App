import JsPDF from 'jspdf';
import { memo, useCallback } from 'react';
import { BsFillFilePdfFill } from 'react-icons/bs';
import styles from './reportes.module.css';
import ViewWeb from './ViewWeb';

const Reportes = () => {
  const handleClick = useCallback(() => {
    const report = new JsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [850, 900],
    });
    report.html(document.querySelector('#pdfDocument')).then(() => {
      report.save('SystemicaReport.pdf');
    });
  });

  return (
    <section className={styles.Reportes}>
      <button onClick={handleClick} className={styles.DownloadButton}>
        <BsFillFilePdfFill />
        <span>Descargar como PDF</span>
      </button>
      <ViewWeb />
    </section>
  );
};

export default memo(Reportes);