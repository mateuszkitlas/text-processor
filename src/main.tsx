import { useState } from "react";
import { createRoot } from "react-dom/client";
import { transcription, type Kind } from "@keatlass/transcribe-pl-be-uk";
import "./style.css";

type SRecord<T>  = Record<string, T>
const keys = <T extends Record<any, any>>(t: T) => Object.keys(t) as  (keyof { [K in keyof T as K extends string ? K : K extends number ? `${K}` : never]: 0 })[]



const kindByLabel = {
    "Łacinka -> Cyrylica": { alphabet: "cyrillic" },
  "Ukraiński -> Łacinka (wg Łozińskiego)":
     { alphabet: "latin", language: "ukrainian", kind: "Łoziński" },
"Ukraiński -> Łacinka (wg Jirečka)": { alphabet: "latin", language: "ukrainian", kind: "Jireček" },
"Ukraiński -> Łacinka (oficjalna)": { alphabet: "latin", language: "ukrainian", kind: "official" },  
  "Białoruski -> Łacinka (archaiczna)": { alphabet: "latin", language: "belarusian", "kind": "archaic" },
  "Białoruski -> Łacinka (klasyczna)": { alphabet: "latin", language: "belarusian", "kind":"classic" },
  "Białoruski -> Łacinka (oficjalna)": { alphabet: "latin", language: "belarusian", "kind": "official" },
  
  
 } satisfies SRecord<Kind>


const labels = keys(kindByLabel)
type Label = keyof typeof kindByLabel

function App() {
  const [label, setLabel] = useState<Label>(labels[0]);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const output = transcription(text, kindByLabel[label]);

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
  }

  async function pasteText() {
    updateText(await navigator.clipboard.readText());
  }

  function updateText(value: string) {
    setText(value);
    setCopied(false);
  }

  return (
    <main className="workspace">
      <section className="editors" aria-label="Transcription editor">
        <div className="editor-pane">

          <div className="pane-heading">
                                <label className="direction-control">
          <select
            value={label}
            onChange={(event) => {
              setLabel(event.target.value as Label);
              setCopied(false);
            }}
          >
            {labels.map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>
        </label>
             <button
              className="button"
              type="button"
              onClick={pasteText}
            >
              Paste
            </button>
          </div>
          <textarea
            id="source-text"
            autoFocus
            placeholder="Start typing or paste text here..."
            value={text}
            onChange={(event) => updateText(event.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="editor-pane output-pane">
          <div className="pane-heading">
            <button
              className="button"
              type="button"
              disabled={!output}
              onClick={copyOutput}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre aria-live="polite" dir="auto">{output || "Your transcription will appear here..."}</pre>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);