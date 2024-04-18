// Import the useState hook to hold state, and the useLayoutEffect hook for DOM measurements
import React, { useState, useRef, useLayoutEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PdfViewer.css'; // Assuming you've created this module

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState(null);
  const pdfViewerRef = useRef(null); // Create a ref for the PDF viewer container

  useLayoutEffect(() => {
    // Update page width to fit the container
    const updatePageWidth = () => {
      if (pdfViewerRef.current) {
        setPageWidth(pdfViewerRef.current.offsetWidth);
      }
    };

    // Update on initial render
    updatePageWidth();

    // Update on window resize
    window.addEventListener('resize', updatePageWidth);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updatePageWidth);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    // Set the page width when the document is first loaded
    setPageWidth(pdfViewerRef.current.offsetWidth);
  };

  return (
    <div className="container" ref={pdfViewerRef}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} width={pageWidth} renderTextLayer={false} />
      </Document>
      <div className="buttonContainer">
        <button onClick={() => setPageNumber(Math.max(1, pageNumber - 1))} disabled={pageNumber <= 1}>
          Back
        </button>
        <button onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))} disabled={pageNumber >= numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;

