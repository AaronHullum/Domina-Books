import db from "../database/db.js";

export function validateJournalLines(lines){

    let debits = 0;
    let credits = 0;

    if(!Array.isArray(lines) || lines.length < 2){
        throw new Error(
            "Journal entry requires at least two lines."
        );
    }

    for(const line of lines){

        const debit =
            Number(line.debitCents || 0);

        const credit =
            Number(line.creditCents || 0);

        if(
            (debit > 0 && credit > 0) ||
            (debit === 0 && credit === 0)
        ){
            throw new Error(
                "Each line requires either a debit or credit."
            );
        }

        debits += debit;
        credits += credit;
    }

    if(debits !== credits){
        throw new Error(
            `Out of balance: ${debits} vs ${credits}`
        );
    }

    return true;
}

export function createJournalEntry(data){

    validateJournalLines(data.lines);

    const transaction =
        db.transaction(()=>{

            const entry =
                db.prepare(`
                    INSERT INTO journal_entries
                    (
                        company_id,
                        entry_date,
                        reference,
                        description
                    )
                    VALUES (?, ?, ?, ?)
                `)
                .run(
                    data.companyId,
                    data.entryDate,
                    data.reference || null,
                    data.description || null
                );

            const insertLine =
                db.prepare(`
                    INSERT INTO journal_lines
                    (
                        journal_entry_id,
                        account_id,
                        debit_cents,
                        credit_cents
                    )
                    VALUES (?, ?, ?, ?)
                `);

            for(const line of data.lines){

                insertLine.run(
                    entry.lastInsertRowid,
                    line.accountId,
                    line.debitCents || 0,
                    line.creditCents || 0
                );

            }

            return entry.lastInsertRowid;

        });

    return transaction();
}
