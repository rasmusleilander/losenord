import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { postReq } from "@/dataReq";
import DownloadPDF from "./DownloadPDF";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

interface CreateLinkProps {
    payload: string;
    expireAfterDays: number;
    expireAfterViews: number;
    resetLink: boolean; // Signal to reset the link
    onLinkReset: () => void; // Callback to clear the reset signal
}

const CreateLink: React.FC<CreateLinkProps> = ({
    payload,
    expireAfterDays,
    expireAfterViews,
    resetLink,
    onLinkReset,
}) => {
    const [generatedLink, setGeneratedLink] = useState("");
    const [qrValue, setQrValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateLink = async () => {
        try {
            const link = await postReq(payload, expireAfterDays, expireAfterViews);
            if (link.startsWith("http")) {
                setGeneratedLink(link);
                setQrValue(link);
                setErrorMessage("");
                toast.success("Länken har skapats");
            } else {
                throw new Error(link);
            }
        } catch (error) {
            setErrorMessage("Misslyckades att generera länk. Försök igen.");
            toast.error("Det gick inte skapa länk");
        }
    };

    const copyToClipboard = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink);
            toast.success("Länken har kopierats");
        }
    };

    // Reset the state when resetLink is triggered
    useEffect(() => {
        if (resetLink) {
            setGeneratedLink("");
            setQrValue("");
            setErrorMessage("");
            onLinkReset();
        }
    }, [resetLink, onLinkReset]);

    return (
        <div className="mt-4 text-center">
            <Toaster position="bottom-right" reverseOrder={false} />

            <Button
                onClick={handleCreateLink}
                className="bg-[#15995d] text-white text-base px-4 py-2 rounded-md hover:bg-[#138c54] w-full"
            >
                Skapa Länk
            </Button>

            {generatedLink && (
                <>
                    <p className="text-[#204434] font-medium mt-4">Din länk:</p>
                    <a
                        href={generatedLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#15995d] hover:underline break-all"
                    >
                        {generatedLink}
                    </a>
                    <div className="m-4">
                        <QRCodeSVG value={qrValue} size={150} className="mx-auto" />
                    </div>
                    <Button
                        onClick={copyToClipboard}
                        className="mt-2 bg-[#204434] text-white px-4 py-2 rounded-md hover:bg-[#18352c] w-full text-base"
                    >
                        Kopiera Länk
                    </Button>
                    <DownloadPDF
                        link={generatedLink}
                        qrValue={generatedLink}
                        customMessage="Skanna QR-koden för att komma till ditt lösenord eller använd länken nedan:"
                    />
                </>
            )}
        </div>
    );
};

export default CreateLink;
