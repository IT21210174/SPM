import React, { useState, useEffect } from 'react';

function DublicateCode({ fileExtension1, fileContent1, file }) {
  const [duplicateCode, setDuplicateCode] = useState([]);

  useEffect(() => {
    // ... Existing code for counting code metrics ...

    // Code duplication detection
    const codeLines = fileContent1.split('\n');
    const duplicateLines = new Set();
    const foundDuplicates = [];

    // Loop through each line of code
    for (let i = 0; i < codeLines.length; i++) {
      const line1 = codeLines[i];

      // Compare with subsequent lines
      for (let j = i + 1; j < codeLines.length; j++) {
        const line2 = codeLines[j];

        // If lines are similar, consider them duplicates
        if (line1 === line2) {
          duplicateLines.add(line1);
          duplicateLines.add(line2);
        }
      }
    }

    // Convert duplicate lines to an array
    const duplicateCodeArray = Array.from(duplicateLines);

    // Filter out empty lines and whitespace
    const cleanDuplicateCodeArray = duplicateCodeArray.filter((line) => line.trim() !== '');

    // Set the state with the found duplicate lines
    setDuplicateCode(cleanDuplicateCodeArray);
  }, [fileExtension1, fileContent1, file]);
  

  return (
    <div>
        
      <ul>
        {duplicateCode.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    

    </div>
  );
}

export default DublicateCode;
