import { Sparkles, UploadCloud, User, Bot } from 'lucide-react';
import { useRef, useState } from 'react';

interface TranscriptEditorProps {
  transcript: string;
  setTranscript: (val: string) => void;
  appState: 'input' | 'paywall' | 'analyzing' | 'results';
  onAnalyze: (mode: 'human' | 'ai') => void;
}

export default function TranscriptEditor({ transcript, setTranscript, appState, onAnalyze }: TranscriptEditorProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingPdf, setIsProcessingPdf] = useState(false);
  const [mode, setMode] = useState<'human' | 'ai'>('human');
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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative' }}>
      
      {/* Mode Toggle */}
      <div style={{ padding: '0 24px', marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <button 
            onClick={() => setMode('human')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              background: mode === 'human' ? 'var(--accent-blue)' : 'transparent',
              color: mode === 'human' ? '#FFF' : 'var(--text-secondary)'
            }}
          >
            <User size={16} /> Human Rep
          </button>
          <button 
            onClick={() => setMode('ai')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              background: mode === 'ai' ? '#8b5cf6' : 'transparent',
              color: mode === 'ai' ? '#FFF' : 'var(--text-secondary)'
            }}
          >
            <Bot size={16} /> AI Agent
          </button>
        </div>
      </div>

      <div 
        className="editor-container" 
        style={{ flex: 1, display: 'flex', position: 'relative' }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea 
          className={`editor-textarea ${appState === 'input' && transcript.length === 0 ? 'empty-state' : ''}`}
          placeholder={isProcessingPdf ? "Reading PDF..." : (mode === 'human' ? "Paste your human rep's sales call transcript here..." : "Paste the failed transcript from your AI Voice Agent here...")}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          disabled={appState !== 'input' || isProcessingPdf}
          style={{ opacity: appState !== 'input' ? 0.7 : 1, zIndex: 1, margin: '16px 24px 24px', width: 'calc(100% - 48px)' }}
        />
        
        {/* Drag overlay */}
        {isDragging && (
          <div style={{
            position: 'absolute',
            top: 16, left: 24, right: 24, bottom: 24,
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
                 style={{ color: 'var(--accent-blue)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}
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
            style={{ 
              padding: '8px 24px', 
              fontSize: '0.875rem',
              background: mode === 'ai' ? '#8b5cf6' : 'var(--accent-blue)' 
            }}
            onClick={() => onAnalyze(mode)}
            disabled={transcript.length < 10 || isProcessingPdf}
          >
            {mode === 'human' ? 'Analyze Call' : 'Optimize Agent Prompt'} <Sparkles size={14} style={{ marginLeft: '6px' }} />
          </button>
        )}
      </div>
    </div>
  );
}