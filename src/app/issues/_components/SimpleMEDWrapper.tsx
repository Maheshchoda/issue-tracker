import 'easymde/dist/easymde.min.css';
import React, { forwardRef } from 'react';
import SimpleMdeReact from 'react-simplemde-editor';

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

const SimpleMDEWrapper = forwardRef<SimpleMDEEditor, SimpleMDEProps>((props, ref) => {
  return (
    <SimpleMdeReact
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
