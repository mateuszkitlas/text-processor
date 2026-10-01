import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { transcription, type Kind } from "@keatlass/transcribe-pl-be-uk";
import "./style.css";

type SRecord<T> = Record<string, T>;
const keys = <T extends Record<any, any>>(t: T) =>
  Object.keys(t) as (keyof {
    [
      K in keyof T as K extends string ? K : K extends number ? `${K}` : never
    ]: 0;
  })[];

const kindByLabel = {
  "Łacinka -> Cyrylica": { alphabet: "cyrillic" },
  "Ukraiński -> Łacinka (wg Łozińskiego)": {
    alphabet: "latin",
    language: "ukrainian",
    kind: "Łoziński",
  },
  "Ukraiński -> Łacinka (wg Jirečka)": {
    alphabet: "latin",
    language: "ukrainian",
    kind: "Jireček",
  },
  "Ukraiński -> Łacinka (oficjalna)": {
    alphabet: "latin",
    language: "ukrainian",
    kind: "official",
  },
  "Białoruski -> Łacinka (archaiczna)": {
    alphabet: "latin",
    language: "belarusian",
    kind: "archaic",
  },
  "Białoruski -> Łacinka (klasyczna)": {
    alphabet: "latin",
    language: "belarusian",
    kind: "classic",
  },
  "Białoruski -> Łacinka (oficjalna)": {
    alphabet: "latin",
    language: "belarusian",
    kind: "official",
  },
} satisfies SRecord<Kind>;

const labels = keys(kindByLabel);
type Label = keyof typeof kindByLabel;

function App() {
  const [label, setLabel] = useState<Label>(labels[0]);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [paneSplit, setPaneSplit] = useState(50);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("theme") === "dark" ? "dark" : "light",
  );
  const output = transcription(text, kindByLabel[label]);
  useEffect(() => {
    window.document.title = label;
  }, [label]);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  }

  function resizePanes(event: React.PointerEvent<HTMLDivElement>) {
    const editors = event.currentTarget.parentElement;
    if (!editors) return;

    const updateSplit = (moveEvent: PointerEvent) => {
      const bounds = editors.getBoundingClientRect();
      const isHorizontal = window.matchMedia("(max-width: 700px)").matches;
      const position = isHorizontal
        ? moveEvent.clientY - bounds.top
        : moveEvent.clientX - bounds.left;
      const size = isHorizontal ? bounds.height : bounds.width;
      const split = (position / size) * 100;
      setPaneSplit(Math.min(80, Math.max(20, split)));
    };
    const stopResizing = () => {
      window.removeEventListener("pointermove", updateSplit);
      window.removeEventListener("pointerup", stopResizing);
    };

    window.addEventListener("pointermove", updateSplit);
    window.addEventListener("pointerup", stopResizing, { once: true });
  }

  async function copyOutput() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
  }

  async function pasteInput() {
    updateText(await navigator.clipboard.readText());
  }

  function updateText(value: string) {
    setText(value);
    setCopied(false);
  }

  return (
    <main className="workspace" data-theme={theme}>
      <section
        className="editors"
        aria-label="Transcription editor"
        style={
          {
            "--pane-first": `${paneSplit}fr`,
            "--pane-second": `${100 - paneSplit}fr`,
          } as React.CSSProperties
        }
      >
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
                  <option key={label} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="button"
              type="button"
              aria-pressed={theme === "dark"}
              onClick={toggleTheme}
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <button className="button" type="button" onClick={pasteInput}>
              Paste input
            </button>
            <div className="pane-heading">
              <button
                className="button"
                type="button"
                disabled={!output}
                onClick={copyOutput}
              >
                {copied ? "Copied" : "Copy output"}
              </button>
            </div>
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
        <div
          className="pane-divider"
          role="separator"
          aria-label="Resize editor panes"
          aria-orientation="vertical"
          aria-valuemin={20}
          aria-valuemax={80}
          aria-valuenow={Math.round(paneSplit)}
          onPointerDown={resizePanes}
        />

        <div className="editor-pane output-pane">
          <pre aria-live="polite" dir="auto">
            {output || "Your transcription will appear here..."}
          </pre>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
