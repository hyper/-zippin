import React from 'react';
import {useDropzone, DropEvent, FileRejection} from 'react-dropzone';

type Error = {
  error: {
    message: string;
    type: string;
  };
};

interface ZippinFile {
  id: string;
  object: string;
  created: number;
  user: string;
  bucket: string;
  type: string;
  size: number;
  filename: string;
  extension: string;
  restricted: boolean;
  url: string;
  metadata: { [key: string]: any };
}

interface DropzoneProps {
  accept?: string[];
  apiKey: string;
  autoFocus?: boolean;
  baseUrl?: string;
  bucket?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onDrop?: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void;
  onError?: (error: Error) => void;
  onUpload?: (file: ZippinFile) => void;
  maxSize?: number;
  noClick?: boolean;
  noDrag?: boolean;
  noKeyboard?: boolean;
  style?: React.CSSProperties;
}

export default function Dropzone({
                                   accept,
                                   apiKey,
                                   autoFocus,
                                   baseUrl,
                                   bucket,
                                   children,
                                   className,
                                   disabled,
                                   onDrop,
                                   onError,
                                   onUpload,
                                   maxSize,
                                   noClick,
                                   noDrag,
                                   noKeyboard,
                                   style,
                                 }: DropzoneProps) {
  baseUrl = baseUrl || 'https://bucket-api-production.up.railway.app';

  const handleDrop = React.useCallback(
      async (data: File[], fileRejections: FileRejection[], event: DropEvent) => {
        if (onDrop) onDrop(data, fileRejections, event);

        const formData = new FormData();
        formData.append('file', data[0]);

        const response = await fetch(`${baseUrl}/v1/files?bucket=${bucket || 'default'}`, {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (response.ok) {
          const file = await response.json();
          if (onUpload) onUpload(file);
        } else {
          const error = await response.json();
          if (onError) onError(error);
        }
      },
      [apiKey, baseUrl, bucket, onDrop, onError, onUpload]
  );

  const {getRootProps, getInputProps} = useDropzone({
    accept: accept ? Object.fromEntries(accept.map((type) => [type, []])) : undefined,
    autoFocus,
    disabled,
    onDrop: handleDrop,
    maxSize,
    noClick,
    noDrag,
    noKeyboard,
  });

  return (
      <div {...getRootProps({style})} className={className}>
        <input {...getInputProps()} />
        {children}
      </div>
  );
}
