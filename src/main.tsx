import { useEffect, useRef, useState } from "react";
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
  const [keepAwake, setKeepAwake] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [paneSplit, setPaneSplit] = useState(50);
  const workspaceRef = useRef<HTMLElement>(null);
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    localStorage.getItem("theme") === "dark" ? "dark" : "light",
  );
  const output = transcription(text, kindByLabel[label]);
  useEffect(() => {
    window.document.title = label;
  }, [label]);

  useEffect(() => {
    const updateFullscreen = () => {
      const fullscreen = document.fullscreenElement === workspaceRef.current;
      setIsFullscreen(fullscreen);
      if (!fullscreen) setKeepAwake(false);
    };
    document.addEventListener("fullscreenchange", updateFullscreen);
    return () =>
      document.removeEventListener("fullscreenchange", updateFullscreen);
  }, []);

  useEffect(() => {
    if (!keepAwake) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible" || !("wakeLock" in navigator))
        return;
      void navigator.wakeLock
        .request("screen")
        .then((lock) => {
          wakeLockRef.current = lock;
        })
        .catch(() => undefined);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      const lock = wakeLockRef.current;
      wakeLockRef.current = null;
      void lock?.release().catch(() => {});
    };
  }, [keepAwake]);

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

  async function toggleFullscreen() {
    if (keepAwake) {
      setKeepAwake(false);
      if (document.fullscreenElement === workspaceRef.current) {
        await document.exitFullscreen().catch(() => {});
      }
      return;
    }

    setKeepAwake(true);
    const fullscreenRequest = workspaceRef.current
      ?.requestFullscreen()
      .catch(() => undefined);
    if ("wakeLock" in navigator) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request("screen");
      } catch {
        return;
      }
    }
    await fullscreenRequest;
  }

  function updateText(value: string) {
    setText(value);
    setCopied(false);
  }

  return (
    <main ref={workspaceRef} className="workspace" data-theme={theme}>
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
            <button
              className="button"
              type="button"
              aria-pressed={keepAwake}
              onClick={toggleFullscreen}
            >
              {isFullscreen ? "Exit" : "Fullscreen"}
            </button>
            <button
              className="button"
              type="button"
              aria-pressed={theme === "dark"}
              onClick={toggleTheme}
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
            <button className="button" type="button" onClick={pasteInput}>
              Paste
            </button>
            <button
              className="button"
              type="button"
              disabled={!output}
              onClick={copyOutput}
            >
              {copied ? "Copied" : "Copy"}
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
