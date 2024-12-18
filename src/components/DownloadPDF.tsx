import React from "react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";


interface DownloadPDFProps {
    link: string;
    qrValue: string;
    customMessage: string;
}

const DownloadPDF: React.FC<DownloadPDFProps> = ({ link, qrValue, customMessage }) => {
    const generatePDF = async () => {
        const doc = new jsPDF();

        // Fonts and styles
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor("#204434");

        // Rubrik
        doc.text("Lösenordsinformation", 105, 20, { align: "center" });

        // Eget meddelande
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor("#000");
        doc.text(customMessage, 105, 40, { align: "center", maxWidth: 180 });

        // Generera QR-kod and lägg till i  PDF
        const qrCodeDataURL = await QRCode.toDataURL(qrValue);
        doc.addImage(qrCodeDataURL, "PNG", 80, 60, 50, 50); // x, y, bredd, höjd

        // Länk under QR kod
        doc.setFontSize(12);
        doc.setTextColor("#000");
        doc.textWithLink(link, 105, 130, { url: link, align: "center" });

        // Footer
        doc.setTextColor("#555");
        doc.setFontSize(10);
        doc.text("Evolvit Solutions AB", 105, 280, { align: "center" });

        // Spara PDF
        doc.save("Evolvit-losenord.pdf");
    };


    return (
        <Button
            onClick={generatePDF}
            className="mt-2 bg-[#1E293B] text-white px-4 py-2 rounded-md hover:bg-[#111827] w-full text-base"
        >
            Ladda ner PDF
        </Button>
    );
};

export default DownloadPDF;
