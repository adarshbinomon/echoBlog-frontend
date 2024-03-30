import React, { useState, useEffect } from "react";
import Quill, { QuillOptionsStatic } from "quill";
import "quill/dist/quill.bubble.css";

interface QuillViewerProps {
  content: string;
}

const QuillViewer: React.FC<QuillViewerProps> = ({ content }) => {
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
    if (!quill) {
      const quillInstance = new Quill("#quill-viewer", {
        readOnly: true,
        theme: "bubble",
      });

      quillInstance.clipboard.dangerouslyPasteHTML(content);

      setQuill(quillInstance);
    }

    return () => {
      if (quill) {
        (quill as Quill).disable(); 
        setQuill(null);
      }
    };
  }, [content, quill]);

  return <div  id="quill-viewer" />;
};

export default QuillViewer;
