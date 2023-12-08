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
                `DROP TABLE IF EXISTS Game;`,
                (err: Error) => {
                    if (err) {
                        return res.status(200).json({status: 401 ,message:"OK"})
                    }
                    console.log("Dropped Game table.");
                    return res.status(200).json({status: 200,message:"OK"})
                }
            );
        });
    } catch (err: Error) {
        return res.status(200).json({err: "while adding"})
    }


}
