import * as React from 'react';
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material';

// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';


interface PDFViewerProps {
  sx?: object;
  scrollToEnd?: () => void;
}
const PDFViewer: React.FC<PDFViewerProps> = ( { sx, scrollToEnd } ) => {

  const [loading, setLoading] = React.useState(true);
  const canvasContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const loadingTask = pdfjsLib.getDocument('/pdf/SKM_C250i25012416080.pdf');
    loadingTask.promise.then((pdf) => {
      const container = canvasContainerRef.current;
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then((page) => {
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          const renderContext = {
            canvasContext: context!,
            viewport: viewport,
          };
          page.render(renderContext);
  
          container!.appendChild(canvas);
          setLoading(false);
        });
      }
    });
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;

    console.log(scrollTop, scrollHeight, clientHeight);
    if (scrollTop + clientHeight >= scrollHeight) {
      if (scrollToEnd) {
        scrollToEnd();
      }
    }
  };

  return (

    <Box {...sx} >
      <Box ref={canvasContainerRef}>
        {loading && <CircularProgress/>}      
      </Box>
    </Box>
  
  );
};

export default PDFViewer;