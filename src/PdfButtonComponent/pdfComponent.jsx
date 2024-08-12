import React from "react";
import axios from "axios";
import FileSaver from "file-saver";

const PdfButtonComponent = () => {
    const downloadButton = async () => {
        try {
            const response = await axios.get("https://localhost:7281/api/Customers/PDF", {
                responseType: 'blob',
            });
            if (response.status === 200 && response.data) {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                FileSaver.saveAs(pdfBlob, 'customers.pdf');
            } else {
                console.error('Error fetching data:', error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div id="root">
            <span className="bg-gradient-to-br from-green-500 to-purple-600 rounded-xl text-white px-4 py-4">
                <button onClick={downloadButton}>Download PDF</button>
            </span>
        </div>

    );
};
export default PdfButtonComponent;
