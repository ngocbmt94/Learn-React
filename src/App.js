import { useState } from "react";

function App() {
  return (
    <>
      <TipCalculator />
      <TextAnalyze />
      <Password />
    </>
  );
}
// coddinng challenge
function TipCalculator() {
  const [bill, setBill] = useState(0);
  const [percents, setPercents] = useState([
    { percent: 0, description: "How did you like the service ?" },
    { percent: 0, description: "How did your friend like the service ?" },
  ]);
  const averagePercent = percents.reduce((acc, ob) => acc + ob.percent, 0) / percents.length;
  const tip = (bill * averagePercent) / 100;

  function handleBill(billValue) {
    if (!billValue) return;
    setBill(billValue);
  }

  function handlePercents(percentValue, index) {
    setPercents((percents) => percents.map((ob, i) => (i === index ? { ...ob, percent: percentValue } : ob)));
  }

  function handleReset() {
    setBill(0);
    setPercents((percents) =>
      percents.map((ob) => {
        return { ...ob, percent: 0 };
      })
    );
  }

  return (
    <>
      <BillInput bill={bill} onBill={handleBill} />
      {percents.map((ob, index) => (
        <SelectPercentage key={index} percent={ob.percent} index={index} onChangePercent={handlePercents}>
          {ob.description}
        </SelectPercentage>
      ))}
      {bill > 0 && (
        <>
          <BillOutput bill={bill} tip={tip} />
          <ResetBill onReset={handleReset} />
        </>
      )}
    </>
  );
}

function BillInput({ bill, onBill }) {
  return (
    <form>
      <label>How much was the bill?</label>
      <input type="text" placeholder="input bill..." value={bill} onChange={(e) => onBill(Number(e.target.value))} />
    </form>
  );
}

function SelectPercentage({ children, percent, onChangePercent, index }) {
  return (
    <div>
      <span>{children}</span>
      <select value={percent} onChange={(e) => onChangePercent(Number(e.target.value), index)}>
        <option value="0">Dissatisfied 0%</option>
        <option value="5">It was ok 5%</option>
        <option value="10">It was good 10%</option>
        <option value="20">Absolutely amazing 20%</option>
      </select>
    </div>
  );
}

function BillOutput({ bill, tip }) {
  return (
    <h3>
      Totall bill is ${bill + tip} (${bill} bill + ${tip} tip)
    </h3>
  );
}

function ResetBill({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}

// text analyze challenge
function TextAnalyze() {
  const [valueText, setValueText] = useState("");

  function handleText(text) {
    setValueText(text);

    calCharacter();
    calWord();
    calSentence();
    calParagraph();
    longestWord();
  }

  function calCharacter() {
    return valueText.length;
  }
  function calWord() {
    if (valueText === "") return 0;
    return valueText.split(" ").filter((character) => character !== "").length;
  }
  function calSentence() {
    let numSentence = 0;
    for (let i = 0; i < valueText.length; i++) {
      if (valueText[i] === ".") numSentence += 1;
    }
    return numSentence;
  }
  function calParagraph() {
    let numParagraph = 0;
    for (let i = 0; i < valueText.length; i++) {
      if (valueText[i] === "\n") numParagraph += 1;
      else numParagraph = 1;
    }
    return numParagraph;
  }
  function longestWord() {
    if (valueText === "") return "-";
    const longestWord = valueText.split(" ").reduce((acc, word) => (word.length > acc.length ? (acc = word) : acc), valueText[0]);
    return longestWord;
  }

  return (
    <>
      <div className="description-container">
        <Description>
          <p>Words</p>
          <h3>{calWord()}</h3>
        </Description>
        <Description>
          <p>Character</p>
          <h3>{calCharacter()}</h3>
        </Description>
        <Description>
          <p>Sentences</p>
          <h3>{calSentence()}</h3>
        </Description>
        <Description>
          <p>Paragraph</p>
          <h3>{calParagraph()}</h3>
        </Description>
        <Description>
          <p>Longest word</p>
          <h3>{longestWord()}</h3>
        </Description>
      </div>

      <TextInput valueText={valueText} onChangeText={handleText} />
    </>
  );
}
function TextInput({ valueText, onChangeText }) {
  return <textarea placeholder="Paste your text here..." value={valueText} onChange={(e) => onChangeText(e.target.value)}></textarea>;
}
function Description({ children }) {
  return <div className="description">{children}</div>;
}

// password generator
// const character = "0123456789abcdefghijklmnopqrstuvwxyz^[!@#$%^&*()_+-=[]{};':\\|,.<>/?]*$ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const typeCheck = [
  {
    typeName: "uppercase",
    typeCharacter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    typeName: "lowercase",
    typeCharacter: "abcdefghijklmnopqrstuvwxyz",
  },
  {
    typeName: "number",
    typeCharacter: "0123456789",
  },
  {
    typeName: "special",
    typeCharacter: "^[!@#$%^&*()_+-=[]{};':\\|,.<>/?]*$",
  },
];

function Password() {
  const [passwordLength, setPasswordLength] = useState(5);
  const [password, setPassword] = useState("");
  const [allType, setAllType] = useState([]);

  // create 1 array that contains the type user checked
  function handleAllType(type) {
    setAllType((allType) => (!allType.includes(type) ? [...allType, type] : allType.filter((el) => el !== type)));
  }

  function handlePassword() {
    let character = "";
    for (let i = 0; i < allType.length; i++) {
      for (let x = 0; x < typeCheck.length; x++) {
        if (allType[i] === typeCheck[x].typeName) character += typeCheck[x].typeCharacter; // create strings character from type user checked
      }
    }
    // console.log(character);

    let markupPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * character.length);
      markupPassword += character.substring(randomNumber, randomNumber + 1); // cut character random in strings character user checked
    }
    setPassword(markupPassword);
  }

  // Configure the length of the password
  function handlePasswordLength(length) {
    setPasswordLength(length);
  }

  function displayWarn() {
    let text;

    if (passwordLength < 8 || allType.length === 1) text = "short";
    else {
      if (allType.length === 1) text = "short";
      else if (allType.length === 2) text = "weak";
      else if (allType.length === 3) text = "medium";
      else if (allType.length === 4) text = "strong";
    }
    return text;
  }

  return (
    <form className="password">
      <PasswordHeader />
      <InputField password={password} onSetPassword={handlePassword} />
      {allType.length !== 0 && <Warn warn={displayWarn()} />}
      <RangeField passwordLength={passwordLength} onSetPasswordLength={handlePasswordLength} />
      <CheckField onsetAllType={handleAllType} />
    </form>
  );
}
function PasswordHeader() {
  return (
    <>
      <img className="password-img" src="./password.gif" alt="password" />
      <h3>PASSWORD GENERATOR</h3>
      <p>Create strong and secure passwords to keep your account safe online.</p>
    </>
  );
}
function InputField({ password, onSetPassword }) {
  return (
    <>
      <div className="password-field">
        <input type="text" placeholder="Create your password" defaultValue={password} />
        <svg onClick={onSetPassword} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 28.4375C8.49998 28.4375 3.22498 23.15 3.22498 16.6625C3.22498 10.175 8.49998 4.875 15 4.875C16.3375 4.875 17.6375 5.0625 18.8875 5.45C19.3875 5.6 19.6625 6.125 19.5125 6.625C19.3625 7.125 18.8375 7.4 18.3375 7.25C17.275 6.925 16.15 6.75 15 6.75C9.53748 6.75 5.09998 11.1875 5.09998 16.65C5.09998 22.1125 9.53748 26.55 15 26.55C20.4625 26.55 24.9 22.1125 24.9 16.65C24.9 14.675 24.325 12.775 23.2375 11.15C22.95 10.725 23.0625 10.1375 23.5 9.85C23.925 9.5625 24.5125 9.675 24.8 10.1125C26.1 12.05 26.7875 14.3125 26.7875 16.6625C26.775 23.15 21.5 28.4375 15 28.4375Z" fill="black"></path>
          <path d="M20.1625 7.5875C19.9 7.5875 19.6375 7.475 19.45 7.2625L15.8375 3.1125C15.5 2.725 15.5375 2.125 15.925 1.7875C16.3125 1.45 16.9125 1.4875 17.25 1.875L20.8625 6.025C21.2 6.4125 21.1625 7.0125 20.775 7.35C20.6125 7.5125 20.3875 7.5875 20.1625 7.5875Z" fill="black"></path>
          <path d="M15.95 10.6625C15.6625 10.6625 15.375 10.525 15.1875 10.275C14.8875 9.86251 14.975 9.27501 15.3875 8.96251L19.6 5.88751C20.0125 5.57501 20.6 5.67501 20.9125 6.08751C21.225 6.50001 21.125 7.08751 20.7125 7.40001L16.5 10.4875C16.3375 10.6125 16.15 10.6625 15.95 10.6625Z" fill="black"></path>
        </svg>
        <button>COPY</button>
      </div>
    </>
  );
}
function Warn({ warn }) {
  return <b className={`password-alert ${warn}`}>{warn}</b>;
}
function RangeField({ passwordLength, onSetPasswordLength }) {
  return (
    <>
      <h5 className="password-length">Password Length: {passwordLength}</h5>
      <input className="password-range" type="range" min="5" max="30" value={passwordLength} onChange={(e) => onSetPasswordLength(Number(e.target.value))} />
    </>
  );
}
function CheckField({ onsetAllType }) {
  return (
    <div>
      {typeCheck.map((obType) => (
        <CheckItem key={obType.typeName} type={obType.typeName} onsetAllType={onsetAllType} />
      ))}
    </div>
  );
}
function CheckItem({ type, onsetAllType }) {
  //const [checked, setChecked] = useState(false);

  function handleAllType(type) {
    //setChecked((check) => !check);
    onsetAllType(type);
  }
  return (
    <div className="password-check">
      <input id={type} type="checkbox" onClick={() => handleAllType(type)} />
      <label>{type.toUpperCase()}</label>
    </div>
  );
}
export default App;
