// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {RunResult} from "sqlite3";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
    const db = new sqlite3.Database(
        "./collection.db",
        sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err: Error) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("Connected to the SQlite database.");
        }
    );

// Serialize method ensures that database queries are executed sequentially
    try {
        db.serialize(() => {
            // Create the items table if it doesn't exist
            db.run(
                `CREATE TABLE IF NOT EXISTS Game(
        id INTEGER PRIMARY KEY,
        UserMove TEXT,
        CompMove TEXT,
        Result TEXT
      )`,
                (err: Error) => {
                    if (err) {
                        throw err.message;
                    }
                    console.log("Created items table.");


                    const GetSQL = `Select * from Game`;

                    db.all(GetSQL, [], (err:Error, rows:unknown[]) => {
                        if (err) {
                            throw err;
                        }
                        console.log(rows); // rows will contain the results
                        return res.status(200).json({result: rows})
                    });
                }
            );
        });
    } catch (err: Error) {
        return res.status(200).json({err: "while adding"})
    }


}
