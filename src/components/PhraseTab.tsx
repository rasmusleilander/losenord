import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

interface PhraseTabProps {
    passwordPhrase: string;
    setPasswordPhrase: (value: string) => void;
    generatePhrase: () => void;
    wordCount: number;
    setWordCount: (value: number) => void;
    includeNumbers: boolean;
    setIncludeNumbers: (value: boolean) => void;
    includeSpecialCharacters: boolean;
    setIncludeSpecialCharacters: (value: boolean) => void;
    separator: string;
    setSeparator: (value: string) => void;
    expirationDays: number;
    setExpirationDays: (value: number) => void;
    maxViews: number;
    setMaxViews: (value: number) => void;
}

const PhraseTab: React.FC<PhraseTabProps> = ({
    passwordPhrase,
    setPasswordPhrase,
    generatePhrase,
    wordCount,
    setWordCount,
    includeNumbers,
    setIncludeNumbers,
    includeSpecialCharacters,
    setIncludeSpecialCharacters,
    separator,
    setSeparator,
    expirationDays,
    setExpirationDays,
    maxViews,
    setMaxViews,
}) => {
    return (
        <div>
            <div className="relative mb-4">
                <Textarea
                    value={passwordPhrase}
                    onChange={(e) => setPasswordPhrase(e.target.value)}
                    placeholder="Skriv eller generera lösenordsfras här"
                    className="text-center text-2xl font-semibold p-4 border rounded-lg shadow-sm resize-none cursor-text 
                    focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-neutral-400"
                    rows={1}
                />
            </div>
            <Button
                onClick={generatePhrase}
                className="bg-[#15995d] text-white px-4 py-2 rounded-md hover:bg-[#138c54] mb-4 w-full text-base"
            >
                Generera lösenordsfras
            </Button>

            <Separator className="mb-6 mt-2 w-full" />

            <div className="flex items-center mb-4">
                <label className="text-[#204434] font-medium mr-4">Antal ord:</label>
                <div className="flex-1">
                    <Slider
                        min={1}
                        max={6}
                        value={[wordCount]}
                        onValueChange={(value) => setWordCount(value[0])}
                        className="w-full"
                    />
                </div>
                <div className="ml-4 border border-gray-300 rounded-md px-4 py-2 text-center text-sm font-medium text-[#204434] shadow-sm">
                    {wordCount}
                </div>
            </div>

            <div className="flex items-center mb-4">
                <Checkbox
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                    className="mr-2"
                />
                <label className="text-[#204434] font-medium">Inkludera siffror</label>
            </div>

            <div className="flex items-center mb-4">
                <Checkbox
                    checked={includeSpecialCharacters}
                    onCheckedChange={(checked) => setIncludeSpecialCharacters(checked === true)}
                    className="mr-2"
                />
                <label className="text-[#204434] font-medium">Inkludera specialtecken</label>
            </div>

            <div className="mb-6">
                <label className="block text-[#204434] font-medium mb-2">Avgränsare</label>
                <Input
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                    maxLength={1}
                    className="w-full text-center border-gray-300 rounded-md"
                />
            </div>

            <Separator className="my-4 w-full" />

            <div className="mb-4">
                <label className="block text-[#204434] font-medium mb-2">Antal dagar</label>
                <Slider
                    min={1}
                    max={14}
                    value={[expirationDays]}
                    onValueChange={(value) => setExpirationDays(value[0])}
                    className="w-full"
                />
                <span className="block text-gray-600 mt-1 text-center">{expirationDays} dagar</span>
            </div>

            <div className="mb-4">
                <label className="block text-[#204434] font-medium mb-2">Antal visningar</label>
                <Slider
                    min={1}
                    max={20}
                    value={[maxViews]}
                    onValueChange={(value) => setMaxViews(value[0])}
                    className="w-full"
                />
                <span className="block text-gray-600 mt-1 text-center">{maxViews} visningar</span>
            </div>
        </div>
    );
};

export default PhraseTab;
