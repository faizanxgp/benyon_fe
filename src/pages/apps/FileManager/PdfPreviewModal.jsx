import React, { useState, useEffect, useRef } from 'react';
import { Icon, Button } from '../../../componenets';
import { getPdfPagePreview, downloadFile } from '../../../services/api';

// Helper to fetch PDF info (page count, etc)
// Use the same axios instance and baseURL as other file APIs
import { getPdfInfo } from '../../../services/api';
async function fetchPdfInfo(filePath) {
    const response = await getPdfInfo(filePath);
    return response.data;
}

const PdfPreviewModal = ({ show, setShow, filePath, fileName }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [scale, setScale] = useState(1.5);
    const [quality, setQuality] = useState('medium');
    const [error, setError] = useState(null);
    const [pdfInfo, setPdfInfo] = useState(null);
    const [zoomScale, setZoomScale] = useState(50); // Client-side zoom percentage

    // Custom styles for scrollbars
    const scrollbarStyles = `
        .pdf-preview-scroll {
            scrollbar-width: thick;
            scrollbar-color: #dc2626 #fecaca;
        }
        .pdf-preview-scroll::-webkit-scrollbar {
            width: 25px;
            height: 25px;
        }
        .pdf-preview-scroll::-webkit-scrollbar-track {
            background: #fecaca;
            border-radius: 12px;
        }
        .pdf-preview-scroll::-webkit-scrollbar-thumb {
            background: #dc2626;
            border-radius: 12px;
            border: 3px solid #fecaca;
        }
        .pdf-preview-scroll::-webkit-scrollbar-thumb:hover {
            background: #b91c1c;
        }
        .pdf-preview-scroll::-webkit-scrollbar-corner {
            background: #fecaca;
        }
    `;

    // Ref for the scrollable preview container
    const previewScrollRef = useRef(null);

    // Enable ctrl+scrollwheel zoom ONLY when mouse is over the preview area
    useEffect(() => {
        const container = previewScrollRef.current;
        if (!container || !show) return;

        // Prevent browser zoom only when mouse is over the preview area
        const handleWheel = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                setZoomScale(prev => {
                    let current = typeof prev === 'string' ? parseInt(prev) : prev;
                    if (isNaN(current)) current = 100;
                    let newZoom = current;
                    if (e.deltaY < 0) {
                        // Zoom in
                        newZoom = Math.min(current + 10, 500);
                    } else if (e.deltaY > 0) {
                        // Zoom out
                        newZoom = Math.max(current - 10, 10);
                    }
                    setZoomInput(newZoom.toString());
                    return newZoom;
                });
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, [show]);

    // Prevent browser zoom globally when modal is open and ctrl+wheel is used over the preview
    useEffect(() => {
        if (!show) return;
        const preventWindowZoom = (e) => {
            // Only prevent if the mouse is over the preview container
            if (e.ctrlKey && previewScrollRef.current && previewScrollRef.current.contains(e.target)) {
                e.preventDefault();
            }
        };
        window.addEventListener('wheel', preventWindowZoom, { passive: false });
        return () => window.removeEventListener('wheel', preventWindowZoom);
    }, [show]);

    // Reset state when modal opens/closes
    useEffect(() => {
        let ignore = false;
        async function loadInfoAndFirstPage() {
            setCurrentPage(1);
            setScale(1.5);
            setQuality('medium');
            setError(null);
            setZoomScale(50); // Set default zoom to 50%
            setTotalPages(1); // Reset
            // Fetch PDF info (page count, etc)
            try {
                const info = await fetchPdfInfo(filePath);
                if (!ignore && info && info.detail && typeof info.detail.page_count === 'number') {
                    setTotalPages(info.detail.page_count);
                }
            } catch (e) {
                // If info fails, fallback to 1 page
                setTotalPages(1);
            }
            // Load first page
            if (!ignore) loadPdfPage(1);
        }
        if (show && filePath) {
            loadInfoAndFirstPage();
        } else {
            setImageData(null);
            setError(null);
        }
        return () => { ignore = true; };
    }, [show, filePath]);

    // Handle zoom input change


    const loadPdfPage = async (page) => {
        if (!filePath) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getPdfPagePreview(filePath, page, quality, scale);
            
            if (response.data && response.data.detail) {
                const { page_number, image_data, width, height, scale: responseScale } = response.data.detail;
                
                setImageData(`data:image/png;base64,${image_data}`);
                setPdfInfo({ width, height, scale: responseScale });
                setCurrentPage(page_number);
                
                // Note: The API doesn't seem to return total pages, so we'll estimate or handle it differently
                // For now, we'll just allow navigation and handle errors if page doesn't exist
            }
        } catch (err) {
            console.error('Error loading PDF page:', err);
            
            // If it's a 404 or page not found error, we might have reached the end
            if (err.response?.status === 404 || err.response?.data?.message?.includes('page')) {
                setError('Page not found. You may have reached the end of the document.');
                // If we're on page 1 and get an error, it's likely not a PDF
                if (page === 1) {
                    setError('This file cannot be previewed as a PDF.');
                }
            } else {
                setError('Failed to load PDF preview: ' + (err.response?.data?.message || err.message));
            }
        } finally {
            setLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            loadPdfPage(newPage);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            loadPdfPage(newPage);
        }
    };

    const handleDownload = async () => {
        if (!filePath) return;

        setLoading(true);
        setError(null);

        try {
            // Direct download using the API
            const response = await downloadFile(filePath);
            
            // Create a blob URL for the downloaded file
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName || 'download.pdf'); // Set default file name

            // Append to body, click and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Revoke the object URL after some time
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        } catch (err) {
            console.error('Error downloading file:', err);
            setError('Failed to download file: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    // Download handler for PDF
    const handleDownloadPdf = async () => {
        try {
            const response = await downloadFile(filePath);
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName || 'document.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert('Failed to download PDF: ' + (error.response?.data?.message || error.message));
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center">
            <style>{scrollbarStyles}</style>
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50" 
                onClick={() => setShow(false)}
            />
            
            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-950 rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[95vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <Icon className="text-2xl text-red-500" name="file-docs" />
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 dark:text-white">
                                PDF Preview
                            </h3>
                            <p className="text-sm text-slate-500">{fileName}</p>
                        </div>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        {/* Zoom Input */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 dark:text-gray-400">Zoom:</label>
                            <select
                                value={zoomScale}
                                onChange={e => {
                                    const val = parseInt(e.target.value);
                                    setZoomScale(val);
                                }}
                                className="w-24 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-center"
                                style={{ minWidth: '80px' }}
                            >
                                <option value={50}>50%</option>
                                <option value={75}>75%</option>
                                <option value={100}>100%</option>
                                <option value={125}>125%</option>
                                <option value={150}>150%</option>
                                <option value={200}>200%</option>
                                <option value={300}>300%</option>
                                <option value={400}>400%</option>
                                <option value={500}>500%</option>
                            </select>
                        </div>
                        
                        {/* Download Button */}
                        <Button.Zoom size="sm" onClick={handleDownloadPdf} title="Download PDF">
                            <Icon className="text-xl text-primary-600" name="download" />
                        </Button.Zoom>

                        <Button.Zoom size="sm" onClick={() => setShow(false)}>
                            <Icon className="text-xl text-slate-400 hover:text-slate-600" name="cross" />
                        </Button.Zoom>
                    </div>
                </div>
                
                {/* Content */}
                <div style={{ 
                    flex: 1,
                    padding: '16px',
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {loading && (
                        <div className="flex items-center justify-center h-64">
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-300">Loading PDF page...</span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <Icon className="text-4xl text-red-500 mx-auto mb-2" name="alert-circle" />
                                <p className="text-red-500 mb-2">{error}</p>
                                {currentPage > 1 && error.includes('Page not found') && (
                                    <Button 
                                        size="sm" 
                                        variant="secondary" 
                                        onClick={handlePreviousPage}
                                    >
                                        Go to Previous Page
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                    {imageData && !loading && !error && (
                        <div
                            ref={previewScrollRef}
                            className="pdf-preview-scroll"
                            style={{
                                width: '100%',
                                height: '750px',
                                overflow: 'scroll',
                                border: '3px solid #1e40af',
                                borderRadius: '8px',
                                backgroundColor: '#f1f5f9',
                                position: 'relative',
                                flexShrink: 0,
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center', // center horizontally
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    width: '100%',
                                }}
                            >
                                <div
                                    style={{
                                        transform: `scale(${zoomScale / 100})`,
                                        transformOrigin: 'top center',
                                        display: 'inline-block',
                                    }}
                                >
                                    <img
                                        src={imageData}
                                        alt={`Page ${currentPage} of ${fileName}`}
                                        style={{
                                            display: 'block',
                                            width: '1500px',
                                            height: 'auto',
                                            minHeight: '1000px',
                                            margin: '20px auto',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {pdfInfo && !loading && !error && (
                        <div className="absolute bottom-16 left-0 right-0 text-center text-sm text-slate-500 bg-white dark:bg-gray-900 bg-opacity-90 py-2">
                            Page {currentPage} • {pdfInfo.width} × {pdfInfo.height} • Scale: {Math.round(pdfInfo.scale * 100)}%
                        </div>
                    )}
                </div>
                
                {/* Footer - Navigation */}
                <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={handlePreviousPage}
                            disabled={currentPage <= 1 || loading}
                        >
                            <Icon className="text-sm mr-1" name="arrow-left" />
                            Previous
                        </Button>
                        
                        <span className="text-sm text-slate-600 dark:text-slate-400 px-3">
                            Page {currentPage}
                        </span>
                        
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={handleNextPage}
                            disabled={loading || currentPage >= totalPages}
                        >
                            Next
                            <Icon className="text-sm ml-1" name="arrow-right" />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={handleDownload}
                            loading={loading}
                        >
                            <Icon className="text-sm mr-1" name="download" />
                            Download
                        </Button>
                        
                        <Button variant="secondary" size="sm" onClick={() => setShow(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfPreviewModal;
