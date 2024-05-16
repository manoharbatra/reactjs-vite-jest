// InputTextbox.tsx
import React, { useState } from "react";

const InputTextbox: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [displayedText, setDisplayedText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleButtonClick = () => {
    setDisplayedText(text);
    setText("");
  };

  return (
    <div>
      <input
        data-testid="text_box"
        type="text"
        value={text}
        onChange={handleChange}
      />
      <button onClick={handleButtonClick}>Display</button>
      <p>{displayedText}</p>
    </div>
  );
};

export default InputTextbox;
