import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';
import 'easymde/dist/easymde.min.css';

// Define the type for the SimpleMDE editor instance
type SimpleMDEEditor = {
  codemirror: any; // Codemirror instance, further types can be imported from the Codemirror library if needed
};

// Define the props expected by SimpleMDE
interface SimpleMDEProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

// Dynamic import of SimpleMDE component with a fallback
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
  loading: () => <div>Loading editor...</div>, // Add a loading indicator
});

const SimpleMDEWrapper = forwardRef<SimpleMDEEditor, SimpleMDEProps>((props, ref) => {
  return (
    <SimpleMDE
      {...props}
      getMdeInstance={(editor: SimpleMDEEditor) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(editor.codemirror);
          } else if ('current' in ref) {
            (ref as React.MutableRefObject<any>).current = editor.codemirror;
          }
        }
      }}
    />
  );
});

SimpleMDEWrapper.displayName = 'SimpleMDEWrapper';

export default SimpleMDEWrapper;
