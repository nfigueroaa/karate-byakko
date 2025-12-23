import { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';

export const useExcel = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const parseExcel = useCallback(async (file) => {
        setLoading(true);
        setError(null);

        try {
            const reader = new FileReader();

            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });

                // Asumimos que la primera hoja es la principal
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Convertir a JSON
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                setData(jsonData);
                setLoading(false);
            };

            reader.onerror = () => {
                setError("Error al leer el archivo");
                setLoading(false);
            }

            reader.readAsBinaryString(file);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }, []);

    const resetData = () => setData(null);

    return { data, loading, error, parseExcel, resetData };
};
