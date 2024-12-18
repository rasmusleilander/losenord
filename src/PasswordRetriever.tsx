import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getReq, inactivateLink } from './dataReq';
import { GETdataFormat } from './dataReq';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast, { Toaster } from "react-hot-toast";

const PasswordRetriever: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [areaText, setAreaText] = useState("");
    const [boxClicked, setBoxClicked] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState<number | null>(null);
    const [viewsRemaining, setViewsRemaining] = useState<number | null>(null);
    const [expired, setExpired] = useState(false);

    useEffect(() => {
        console.log("Retrieved ID:", id);
    }, [id]);

    const getPassword = async (id: string) => {
        try {
            const requestObject: GETdataFormat = await getReq(id);
            console.log("Retrieved Data:", requestObject);
            setAreaText(requestObject.payload);
            setViewsRemaining(requestObject.views_remaining || 0);
            setDaysRemaining(requestObject.days_remaining || 0);
            setExpired(requestObject.expired);
            setBoxClicked(true);
        } catch (error) {
            console.error("Error fetching password:", error);
            toast.error("Kunde inte hämta lösenord. Försök igen.");
        }
    };

    const handleInactivateLink = async (id: string) => {
        try {
            await inactivateLink(id);
            toast.success("Länken har inaktiverats.");
            setExpired(true); // Set the link as expired after inactivation
        } catch (error) {
            console.error("Error inactivating link:", error);
            toast.error("Kunde inte inaktivera länk. Försök igen.");
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(areaText);
        toast.success("Lösenordet har kopierats!");
    };

    const dayParser = () => daysRemaining !== null ? <strong>{daysRemaining} dagar</strong> : "Okänt antal dagar";
    const viewParser = () => viewsRemaining !== null ? <strong>{viewsRemaining} gånger</strong> : "N/A";

    const PasswordInfoText = () => {
        if (expired) return null;

        return (
            <div className="mt-4 text-[#204434]">
                {viewsRemaining === 0 ? (
                    <p>Detta är sista gången du kan visa lösenordet.</p>
                ) : (
                    <p>
                        Lösenordet kan visas {viewParser()} till.
                    </p>
                )}
                <p>
                    {daysRemaining !== null ? (
                        <>Länken slutar gälla om {dayParser()}.</>
                    ) : (
                        "Okänt antal dagar kvar."
                    )}
                </p>
            </div>
        );
    };

    return (
        <div className="flex flex-1 justify-center items-center bg-[#204434] h-auto">
            <Toaster position="bottom-right" />
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg text-center">
                {!expired ? (
                    <>
                        <h2 className="text-2xl font-bold text-[#204434] mb-4">
                            Hämta ditt lösenord
                        </h2>

                        {!boxClicked ? (
                            <Button
                                onClick={() => id && getPassword(id)}
                                className="bg-[#15995d] text-white px-4 py-2 rounded-md hover:bg-[#138c54] w-full"
                            >
                                Klicka här för att hämta lösenord
                            </Button>
                        ) : (
                            <>
                                <Input
                                    readOnly
                                    value={areaText}
                                    className="text-center !text-2xl font-semibold p-8 border rounded-md shadow-sm mb-4"
                                />
                                <Button
                                    onClick={copyToClipboard}
                                    className="bg-[#204434] text-white px-4 py-2 rounded-md hover:bg-[#18352c] w-full"
                                >
                                    Kopiera lösenord
                                </Button>
                                <PasswordInfoText />
                                <Button
                                    onClick={() => id && handleInactivateLink(id)}
                                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 w-full"
                                >
                                    Inaktivera länk
                                </Button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">
                            Länken har upphört att gälla
                        </h2>
                        <p className="text-gray-700 mb-4">
                            Kontakta supporten om du behöver en ny länk.<br />
                            <strong>020 55 55 55 | support@evolvit.se</strong>
                        </p>

                    </>
                )}
            </div>
        </div>
    );
};

export default PasswordRetriever;
