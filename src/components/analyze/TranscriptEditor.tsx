import { Sparkles, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

interface TranscriptEditorProps {
  transcript: string;
  setTranscript: (val: string) => void;
  appState: 'input' | 'paywall' | 'analyzing' | 'results';
  onAnalyze: () => void;
}

export default function TranscriptEditor({ transcript, setTranscript, appState, onAnalyze }: TranscriptEditorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = transcript.trim().split(/\s+/).filter(w => w.length > 0).length;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setIsProcessingPdf(true);
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        setTranscript(fullText);
      } catch (err) {
        console.error("Failed to parse PDF:", err);
        alert('Failed to read the PDF file. Please try another one.');
      } finally {
        setIsProcessingPdf(false);
      }
    } else if (file.type === 'text/plain' || file.type === 'text/csv' || file.name.endsWith('.txt') || file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTranscript(event.target.result as string);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a .txt, .csv, or .pdf file');
    }
  };

  if (appState !== 'input' && appState !== 'paywall') {
    return null; // Don't show in analyzing/results state; the parent handles the AI Processing Log view instead.
  }

  return (
    <>
      <div 
        className="editor-container" 
        style={{ flex: 1, display: 'flex', position: 'relative' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea 
          className={`editor-textarea ${appState === 'input' && transcript.length === 0 ? 'empty-state' : ''}`}
          placeholder={isProcessingPdf ? "Reading PDF..." : "Paste your raw sales call transcript here (e.g. from Zoom, Gong, Fireflies, Otter)... Or drag and drop a .txt/.csv/.pdf file."}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          disabled={appState !== 'input' || isProcessingPdf}
          style={{ opacity: appState !== 'input' ? 0.7 : 1, zIndex: 1 }}
        />
        
        {/* Drag overlay */}
        {isDragging && (
          <div style={{
            position: 'absolute',
            top: 24, left: 24, right: 24, bottom: 24,
            background: 'rgba(59, 130, 246, 0.1)',
            border: '2px dashed var(--accent-blue)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-blue)'
          }}>
             <UploadCloud size={48} style={{ marginBottom: '16px' }} />
             <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Drop transcript file here</h3>
          </div>
        )}
      </div>

      <div className="editor-footer">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span>{wordCount} words</span>
          <span>{transcript.length} characters</span>
          {transcript.length === 0 && (
             <>
               <span style={{ color: 'rgba(255,255,255,0.1)' }}>|</span>
               <button 
                 onClick={() => fileInputRef.current?.click()} 
                 style={{ color: 'var(--accent-blue)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'underline' }}
                 disabled={isProcessingPdf}
               >
                 {isProcessingPdf ? 'Parsing...' : 'Upload File'}
               </button>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileChange} 
                 accept=".txt,.csv,.pdf" 
                 style={{ display: 'none' }} 
               />
             </>
          )}
        </div>
        {appState === 'input' && (
          <button 
            className="btn-primary" 
            style={{ padding: '8px 24px', fontSize: '0.875rem' }}
            onClick={onAnalyze}
            disabled={transcript.length < 10 || isProcessingPdf}
          >
            Analyze Call <Sparkles size={14} style={{ marginLeft: '6px' }} />
          </button>
        )}
      </div>
    </>
  );
}