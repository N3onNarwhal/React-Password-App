import "./styles.css";
import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/strengthChecker";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";

export default function App() {
  const [length, setLength] = useState(8);
  const[checkboxData, setCheckboxData] = useState([
    { title: "Include uppercase letters", state: false },
    { title: "Include lowercase letters", state: false },
    { title: "Include numbers", state: false },
    { title: "Include symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return <div className="container">

    {/* Main Title */}
    <div className='header'>
      <div className='title'>Password Generator</div>
    </div>

    {/* Password Text and Copy */}
    {password && (
      <div className='header'>
        <div className='password'>{password}</div>
          <Button
            text={copied ? "Copied" : "Copy"}
            onClick = {handleCopy}
            customClass = "copyButton"
          />
      </div>
    )}

    {/* Password Length */}
    <div className="characterLength">
      <span>
        <label>Character Length</label>
        <label>{length}</label>
      </span>
      <input
        type='range'
        min='4'
        max='20'
        value={length}
        onChange={(e) => setLength(e.target.value)}
      />
    </div>

    {/* Checkboxes */}
    <div className='checkboxes'>
      {checkboxData.map((checkbox, index) => {
        return (
          <Checkbox 
            key = {index}
            title = {checkbox.title}
            onChange = {() => handleCheckboxChange(index)}
            state = {checkbox.state}
          />
        );
        })}
    </div>

    {/* Strength */}
    <PasswordStrengthIndicator password={password} />

    {/* Error Handling */}
    {errorMessage && <div className="errorMessage">{errorMessage}</div>}

    {/* Generate Button */}
    <Button
            text = "Generate Password"
            onClick = {() => generatePassword(checkboxData, length)}
            customClass = "generateButton"
          />

  </div>;


}