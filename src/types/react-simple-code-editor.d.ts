declare module 'react-simple-code-editor' {
  import { CSSProperties, ReactNode } from 'react';

  export interface EditorProps {
    value: string;
    onValueChange: (value: string) => void;
    highlight: (value: string) => string | ReactNode;
    padding?: number;
    placeholder?: string;
    className?: string;
    style?: CSSProperties;
    textareaClassName?: string;
    preClassName?: string;
    tabSize?: number;
    insertSpaces?: boolean;
    ignoreTabKey?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    form?: string;
    maxLength?: number;
    minLength?: number;
    name?: string;
    readOnly?: boolean;
    required?: boolean;
  }

  export default function Editor(props: EditorProps): JSX.Element;
}
