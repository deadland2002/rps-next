// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {UserMove,CompMove,Result} = req.body

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
    if(UserMove && CompMove && Result){

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


                        const insertSql = `INSERT INTO Game(UserMove, CompMove, Result) VALUES( ?, ?, ?)`;
                        const values1 = [
                            UserMove,
                            CompMove,
                            Result
                        ]

                        db.run(insertSql, values1, function (err: Error) {
                            if (err) {
                                throw err.message;
                            }
                            const id = this.lastID; // get the id of the last inserted row
                            console.log(`Rows inserted, ID ${id}`);
                            return res.status(200).json({ID: id})
                        });
                    }
                );
            });
        } catch (err: Error) {
            return res.status(200).json({err: "while adding"})
        }


    }

    return res.status(200).json({err: "while adding"})


}
