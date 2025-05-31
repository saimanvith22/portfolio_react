import React, { useState, useEffect } from 'react';
import './Dialog.css';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    points: string[];
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, points }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 500); // Match this with the animation duration
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className={`dialog-overlay ${isClosing ? 'closing' : ''}`} onClick={handleClose}>
            <div 
                className={`dialog-content ${isClosing ? 'closing' : ''}`} 
                onClick={e => e.stopPropagation()}
            >
                <div className="dialog-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={handleClose}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="dialog-body">
                    <ul>
                        {points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dialog; 