import { NextResponse } from "next/server";
import { mysqlPool } from "@/utils/db";

export async function GET(request) {
    const promisePool = mysqlPool.promise();
    const [rows,fields] = await promisePool.query('SELECT * FROM attractions');
    return NextResponse.json(rows);
}


//Post /api/attractions -> Create
export async function POST(request) {
    try {
        const body = await request.json();
        //return NextResponse.json(body);
        const {name, detail, coverimage, longitude, latitude} = body;
        const promisePool = mysqlPool.promise();
        const [result] = await promisePool.query('INSERT INTO attractions (name, detail, coverimage, longitude, latitude) VALUES (?, ?, ?, ?, ?)', [name, detail, coverimage, longitude, latitude]);
        return NextResponse.json({id: result.insertId, name, detail, coverimage, longitude, latitude});
    
    const [rows] = await promisePool.query(
        'SELECT * FROM attractions WHERE id = ?',
        [result.insertId]
    )
    return NextResponse.json(rows[0], {status: 201});
} catch (error) {
    return NextResponse.json(
        {error: error.message}, 
        {status: 500})
 }
}
