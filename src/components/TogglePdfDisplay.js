import React, { useState } from 'react';
import PdfViewer from './PdfViewer';
import styles from './TogglePdfDisplay.module.css';

const TogglePdfDisplay = () => {
  const [activePdf, setActivePdf] = useState(null);

  const togglePdf = (pdfName) => {
    // If the button for the active PDF is clicked, hide it, otherwise show the clicked PDF
    setActivePdf(activePdf === pdfName ? null : pdfName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => togglePdf('learnMore')}>
          {activePdf === 'learnMore' ? 'HIDE' : 'Learn More'}
        </button>
        <button className={styles.button} onClick={() => togglePdf('investorInfo')}>
          {activePdf === 'investorInfo' ? 'HIDE' : 'Investor Info'}
        </button>
      </div>
      <div className={styles.pdfContainer}>
        {activePdf === 'learnMore' && <PdfViewer fileUrl="/pdfs/white-paper.pdf" />}
        {activePdf === 'investorInfo' && <PdfViewer fileUrl="/pdfs/investor-guide.pdf" />}
      </div>
    </div>
  );
};

export default TogglePdfDisplay;