import { useState, useEffect } from 'react';

function useVisibleRows(rows) {
    const [visibleRows, setVisibleRows] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleRows((prev) => {
                if (prev.length < rows.length) {
                    return [...prev, prev.length];
                } else {
                    clearInterval(timer);
                    return prev;
                }
            });
        }, 200);
        return () => clearInterval(timer);
    }, [rows.length]);

    return visibleRows;
}

export default useVisibleRows;
