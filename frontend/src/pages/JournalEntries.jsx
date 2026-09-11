import { useState } from "react";
import { useAccounting } from "../context/AccountingContext";

export default function JournalEntries() {
  const { accounts, createJournalEntry, journalEntries, generalLedger, loading, error } = useAccounting();

  // form state: dynamic lines
  const [entryDate, setEntryDate] = useState(new Date().toISOString().slice(0, 10));
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState([
    { id: 1, accountId: null, debit: "", credit: "" },
    { id: 2, accountId: null, debit: "", credit: "" }
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  function updateLine(id, patch) {
    setLines((current) => current.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }

  function addLine() {
    setLines((current) => [...current, { id: Date.now(), accountId: null, debit: "", credit: "" }]);
  }

  function removeLine(id) {
    setLines((current) => current.filter((l) => l.id !== id));
  }

  function validateLines() {
    if (!Array.isArray(lines) || lines.length < 2) {
      return "Journal entry requires at least two lines.";
    }

    let debits = 0;
    let credits = 0;

    for (const l of lines) {
      const debit = Number(l.debit) || 0;
      const credit = Number(l.credit) || 0;

      if ((debit > 0 && credit > 0) || (debit === 0 && credit === 0)) {
        return "Each line must have either a debit or a credit amount (not both).";
      }

      if (!l.accountId) {
        return "Each line must have a selected account.";
      }

      debits += debit;
      credits += credit;
    }

    if (Math.round(debits * 100) !== Math.round(credits * 100)) {
      return `Entry not balanced: debits ${debits} vs credits ${credits}`;
    }

    return null;
  }

  async function handlePostEntry() {
    setFormError(null);
    const v = validateLines();
    if (v) {
      setFormError(v);
      return;
    }

    // build payload: convert dollars -> cents in AccountingContext
    setSubmitting(true);
    try {
      await createJournalEntry({
        entryDate,
        reference,
        description,
        lines: lines.map((l) => ({ accountId: l.accountId, debit: Number(l.debit) || 0, credit: Number(l.credit) || 0 }))
      });

      // clear form
      setReference("");
      setDescription("");
      setLines([
        { id: 1, accountId: null, debit: "", credit: "" },
        { id: 2, accountId: null, debit: "", credit: "" }
      ]);
    } catch (err) {
      console.error(err);
      setFormError(err?.message || "Failed to post journal entry");
    } finally {
      setSubmitting(false);
    }
  }

  // derive recent entries display using journalEntries and generalLedger
  const recentEntries = (journalEntries || []).map((je) => {
    const linesForEntry = (generalLedger || []).filter((l) => l.journalId === je.id);
    const debitTotal = linesForEntry.reduce((s, l) => s + l.debit, 0);
    const creditTotal = linesForEntry.reduce((s, l) => s + l.credit, 0);
    return {
      id: je.id,
      date: je.entryDate,
      reference: je.reference,
      memo: je.description,
      debit: `$${debitTotal.toFixed(2)}`,
      credit: `$${creditTotal.toFixed(2)}`
    };
  });

  return (
    <>
      <h1>Journal Entries</h1>

      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px"
        }}
      >
        <h2>New Journal Entry</h2>

        {loading && <div>Loading accounts...</div>}
        {error && <div style={{ color: "red" }}>{error.message || String(error)}</div>}

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input placeholder="Date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
          <input placeholder="Reference" value={reference} onChange={(e) => setReference(e.target.value)} />
          <input placeholder="Memo" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <h3>Journal Lines</h3>

        <div style={{ display: "grid", gridTemplateColumns: "80px 2fr 1fr 1fr 80px", gap: "10px", fontWeight: "bold", marginBottom: "10px" }}>
          <div>Line</div>
          <div>Account</div>
          <div>Debit</div>
          <div>Credit</div>
          <div></div>
        </div>

        {(lines || []).map((line, idx) => (
          <div key={line.id} style={{ display: "grid", gridTemplateColumns: "80px 2fr 1fr 1fr 80px", gap: "10px", marginBottom: "10px" }}>
            <input value={idx + 1} readOnly />

            <select value={line.accountId || ""} onChange={(e) => updateLine(line.id, { accountId: e.target.value ? Number(e.target.value) : null })}>
              <option value="">Select account</option>
              {(accounts || []).map((a) => (
                <option key={a.id} value={a.id}>{`${a.code} ${a.name}`}</option>
              ))}
            </select>

            <input placeholder="Debit" value={line.debit} onChange={(e) => updateLine(line.id, { debit: e.target.value, credit: "" })} />
            <input placeholder="Credit" value={line.credit} onChange={(e) => updateLine(line.id, { credit: e.target.value, debit: "" })} />

            <div>
              {lines.length > 2 && (
                <button onClick={() => removeLine(line.id)}>Remove</button>
              )}
            </div>
          </div>
        ))}

        <div style={{ marginTop: "8px", marginBottom: "8px" }}>
          <button onClick={addLine}>Add Line</button>
        </div>

        {formError && <div style={{ color: "red", marginBottom: "8px" }}>{formError}</div>}

        <button onClick={handlePostEntry} disabled={submitting || loading} style={{ marginRight: 10 }}>
          {submitting ? "Posting..." : "Post Entry"}
        </button>

      </div>

      <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px" }}>
        <h2>Recent Entries</h2>

        {(journalEntries || []).length === 0 ? (
          <div>No journal entries found.</div>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reference</th>
                <th>Memo</th>
                <th>Debits</th>
                <th>Credits</th>
              </tr>
            </thead>

            <tbody>
              {recentEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>{entry.reference}</td>
                  <td>{entry.memo}</td>
                  <td>{entry.debit}</td>
                  <td>{entry.credit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
