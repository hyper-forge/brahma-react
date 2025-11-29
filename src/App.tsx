import { useState } from "react";

function App() {
  const [response, setResponse] = useState<string>("");

  const callEcho = async () => {
    try {
      const res = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ msg: "Hello from React!" })
      });

      const text = await res.text();
      setResponse(text);
    } catch (err) {
      setResponse("Error: " + (err as Error).message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0e0e0e",
        padding: "2rem",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          background: "#1a1a1a",
          padding: "2rem",
          borderRadius: "14px",
          boxShadow: "0 0 20px rgba(0,0,0,0.6)",
          border: "1px solid #333"
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#4ade80" }}>
          Brahma-Firelight + React Starter
        </h1>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={callEcho}
            style={{
              padding: "12px 28px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "8px",
              border: "none",
              background: "#4ade80",
              color: "#000",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
            POST → /echo
          </button>
        </div>

        <pre
          style={{
            background: "#111",
            color: "#0f0",
            padding: "1rem",
            marginTop: "1.5rem",
            borderRadius: "8px",
            minHeight: "80px",
            fontSize: "14px",
            overflowX: "auto",
            textAlign: "left",
          }}
        >
{response || "Click the button to send POST /echo"}
        </pre>

        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>Docs</h2>

        <iframe
          src="https://shyam20001.github.io/rsjs"
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "10px",
            marginTop: "1rem",
            border: "1px solid #333",
          }}
        />
      </div>
    </div>
  );
}

export default App;
