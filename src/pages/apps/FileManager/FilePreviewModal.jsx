import React from 'react';
import { Icon, Button } from '../../../componenets';

const FilePreviewModal = ({ show, setShow, previewData, fileName }) => {
    if (!show) return null;

    const renderPreviewContent = () => {
        if (!previewData) {
            return (
                <div className="flex items-center justify-center h-64">
                    <p className="text-slate-500">No preview available</p>
                </div>
            );
        }

        // If it's a URL, show it in an iframe
        if (typeof previewData === 'string' && previewData.startsWith('http')) {
            return (
                <iframe
                    src={previewData}
                    className="w-full h-96 border-0"
                    title={`Preview of ${fileName}`}
                />
            );
        }

        // If it's base64 image data with data: prefix
        if (typeof previewData === 'string' && previewData.startsWith('data:image')) {
            return (
                <div className="flex justify-center">
                    <img
                        src={previewData}
                        alt={`Preview of ${fileName}`}
                        className="max-w-full max-h-96 object-contain"
                    />
                </div>
            );
        }

        // If it's a base64 string without data: prefix (assume it's an image)
        if (typeof previewData === 'string' && !previewData.startsWith('data:') && !previewData.startsWith('http')) {
            // Assume it's a base64 encoded image and add the data URL prefix
            const imageDataUrl = `data:image/jpeg;base64,${previewData}`;
            return (
                <div className="flex justify-center">
                    <img
                        src={imageDataUrl}
                        alt={`Preview of ${fileName}`}
                        className="max-w-full max-h-96 object-contain"
                        onError={(e) => {
                            // If it fails as JPEG, try PNG
                            if (e.target.src.includes('jpeg')) {
                                e.target.src = `data:image/png;base64,${previewData}`;
                            } else {
                                // If both fail, show as text
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = `<div class="bg-gray-50 dark:bg-gray-900 p-4 rounded max-h-96 overflow-auto"><pre class="whitespace-pre-wrap text-sm">${previewData}</pre></div>`;
                            }
                        }}
                    />
                </div>
            );
        }

        // If it's base64 PDF data
        if (typeof previewData === 'string' && previewData.startsWith('data:application/pdf')) {
            return (
                <iframe
                    src={previewData}
                    className="w-full h-96 border-0"
                    title={`Preview of ${fileName}`}
                />
            );
        }

        // If it's plain text or other content
        if (typeof previewData === 'string') {
            return (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded max-h-96 overflow-auto">
                    <pre className="whitespace-pre-wrap text-sm">{previewData}</pre>
                </div>
            );
        }

        // If it's an object with a specific structure
        if (typeof previewData === 'object') {
            // Check if it has a URL property
            if (previewData.url) {
                return (
                    <iframe
                        src={previewData.url}
                        className="w-full h-96 border-0"
                        title={`Preview of ${fileName}`}
                    />
                );
            }

            // Check if it has content property
            if (previewData.content) {
                return (
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded max-h-96 overflow-auto">
                        <pre className="whitespace-pre-wrap text-sm">{previewData.content}</pre>
                    </div>
                );
            }

            // If it's some other object, show it as JSON
            return (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded max-h-96 overflow-auto">
                    <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(previewData, null, 2)}</pre>
                </div>
            );
        }

        // Fallback
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-slate-500">Unable to preview this file type</p>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50" 
                onClick={() => setShow(false)}
            />
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-950 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
                            File Preview
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{fileName}</p>
                    </div>
                    <Button.Zoom size="sm" onClick={() => setShow(false)}>
                        <Icon className="text-xl text-slate-400 hover:text-slate-600" name="cross" />
                    </Button.Zoom>
                </div>
                
                {/* Content */}
                <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                    {renderPreviewContent()}
                </div>
                
                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
                    <Button variant="secondary-outline" size="sm" onClick={() => setShow(false)}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FilePreviewModal;
