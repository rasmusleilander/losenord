import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import wordsdata from './words.json'
import CreateLink from "./components/CreateLink";
import PasswordTab from "./components/PasswordTab";
import PhraseTab from "./components/PhraseTab";

const App = () => {
  const [activeTab, setActiveTab] = useState("phrase");
  const [passwordPhrase, setPasswordPhrase] = useState("");
  const [randomPassword, setRandomPassword] = useState("");
  const [wordCount, setWordCount] = useState(2);
  const [charCount, setCharCount] = useState(8);
  const [separator, setSeparator] = useState("-");
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [useCapitalization, setUseCapitalization] = useState(true);
  const [useSpecialCharacters, setUseSpecialCharacters] = useState(true);
  const [expirationDays, setExpirationDays] = useState(7);
  const [maxViews, setMaxViews] = useState(5);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState(true);
  const [resetLink, setResetLink] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(""); // Add this
  const [qrValue, setQrValue] = useState(""); // Add this


  const resetState = () => {
    setResetLink(true); // Signal to reset the link in CreateLink
  };


  const createLinkHandler = (link: string) => {
    setGeneratedLink(link); // Update the generated link
    setQrValue(link); // Set the QR code value to the generated link
  };


  const generatePhrase = () => {
    const words = wordsdata.words; // Assuming `wordsdata.words` contains the list of words
    const specials = "!?%&"; // Define special characters
    const phraseArray = [];

    for (let i = 0; i < wordCount; i++) {
      let word = words[Math.floor(Math.random() * words.length)];

      // Optionally add numbers to the word
      if (includeNumbers && Math.random() > 0.25) {
        const randomNumber = Math.floor(Math.random() * 10);
        word += randomNumber;
      }

      phraseArray.push(word);
    }

    // Ensure the first letter of the first word is uppercase
    if (phraseArray.length > 0) {
      phraseArray[0] = phraseArray[0].charAt(0).toUpperCase() + phraseArray[0].slice(1);
    }

    // Join words with the chosen separator
    let phrase = phraseArray.join(separator);

    // Optionally append a single special character at the end
    if (includeSpecialCharacters) {
      const specialChar = specials[Math.floor(Math.random() * specials.length)];
      phrase += specialChar; // Add the special character at the end
    }

    setPasswordPhrase(phrase); // Update state with the generated phrase
    resetState(); // Reset other states
  };


  const generateRandomPassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specials = "!@#$%&*?";
    const numbers = "0123456789";
    let allChars = chars + numbers;
    if (useCapitalization) allChars += chars.toUpperCase();
    if (useSpecialCharacters) allChars += specials;
    let password = "";
    for (let i = 0; i < charCount; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    setRandomPassword(password);
    resetState();
  };

  return (
    <main className="flex flex-1 justify-center items-center bg-[#204434] py-16">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg mx-4 ">
        {/* Tabs for navigation */}
        <Tabs
          defaultValue="phrase"
          className="w-full"
          onValueChange={(value) => {
            setActiveTab(value);
            resetState();
          }}
        >
          <TabsList className="mb-6 mt-1 flex bg-gray-50 rounded-md shadow-sm">
            <TabsTrigger
              value="phrase"
              className={`w-1/2 p-3 text-base font-medium rounded transition-all ${activeTab === "phrase"
                ? "!bg-[#204434] !text-white shadow-md"
                : "bg-gray-100 text-gray-700"
                }`}
            >
              Lösenordsfras
            </TabsTrigger>

            <TabsTrigger
              value="password"
              className={`w-1/2 p-3 text-base font-medium rounded transition-all ${activeTab === "password"
                ? "!bg-[#204434] !text-white shadow-md"
                : "bg-gray-100 text-gray-700"
                }`}
            >
              Lösenord
            </TabsTrigger>
          </TabsList>


          {/* Phrase Tab */}
          <TabsContent value="phrase">
            <PhraseTab
              passwordPhrase={passwordPhrase}
              setPasswordPhrase={setPasswordPhrase}
              generatePhrase={generatePhrase}
              wordCount={wordCount}
              setWordCount={setWordCount}
              includeNumbers={includeNumbers}
              setIncludeNumbers={setIncludeNumbers}
              includeSpecialCharacters={includeSpecialCharacters}
              setIncludeSpecialCharacters={setIncludeSpecialCharacters}
              separator={separator}
              setSeparator={setSeparator}
              expirationDays={expirationDays}
              setExpirationDays={setExpirationDays}
              maxViews={maxViews}
              setMaxViews={setMaxViews}
            />
          </TabsContent>

          {/* Password Tab */}
          <TabsContent value="password">
            <PasswordTab
              randomPassword={randomPassword}
              setRandomPassword={setRandomPassword}
              generateRandomPassword={generateRandomPassword}
              charCount={charCount}
              setCharCount={setCharCount}
              useCapitalization={useCapitalization}
              setUseCapitalization={setUseCapitalization}
              useSpecialCharacters={useSpecialCharacters}
              setUseSpecialCharacters={setUseSpecialCharacters}
              expirationDays={expirationDays}
              setExpirationDays={setExpirationDays}
              maxViews={maxViews}
              setMaxViews={setMaxViews}
            />
          </TabsContent>
        </Tabs>
        <CreateLink
          payload={activeTab === "phrase" ? passwordPhrase : randomPassword}
          expireAfterDays={expirationDays}
          expireAfterViews={maxViews}
          resetLink={resetLink}
          onLinkReset={() => setResetLink(false)}
        />
      </div>
    </main>
  );
};

export default App;
