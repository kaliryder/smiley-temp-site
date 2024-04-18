import React, { useState, useEffect, useRef } from 'react';
import PdfViewer from './PdfViewer';
import styles from './TogglePdfDisplay.module.css';

const TogglePdfDisplay = () => {
  const [activePdf, setActivePdf] = useState(null);
  const pdfDisplayRef = useRef(null); // Reference to the PDF display area

  // Scroll to the PDF Viewer when a PDF is opened
  useEffect(() => {
    if (activePdf) {
      // Set a timeout to allow the PDF to render and update the page height
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 300); // You may need to adjust the delay
  
      return () => clearTimeout(timeoutId);
    }
  }, [activePdf]);

  const togglePdf = (pdfName) => {
    // Prevent default scroll to top on state change
    window.scrollTo({ top: window.scrollY, behavior: 'auto' });

    if (activePdf !== pdfName) {
      setActivePdf(pdfName);
    } else {
      setActivePdf(null); // Hide the PDF and prevent scrolling by not changing the state
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => togglePdf('learnMore')}>
          {activePdf === 'learnMore' ? 'HIDE' : 'Learn More'}
        </button>
        <button onClick={() => togglePdf('investorInfo')}>
          {activePdf === 'investorInfo' ? 'HIDE' : 'Investor Info'}
        </button>
      </div>
      <div ref={pdfDisplayRef}>
        {activePdf === 'learnMore' && <PdfViewer fileUrl="/pdfs/white-paper.pdf" />}
        {activePdf === 'investorInfo' && <PdfViewer fileUrl="/pdfs/investor-guide.pdf" />}
      </div>
    </div>
  );
};

export default TogglePdfDisplay;