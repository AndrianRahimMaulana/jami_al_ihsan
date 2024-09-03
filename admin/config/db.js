import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

// Koneksi ke database
const db = mysql.createConnection({
	host: process.env.DB_HOST ?? 'localhost',
	user: process.env.DB_USERNAME ?? 'root',
	password: process.env.DB_PASSWORD ?? '',
	database: process.env.DB_DATABASE ?? 'masjid_jami_al_ihsan',
});
db.connect((err) => {
	if (err) {
		console.error('Database connection error: ', err);
		return;
	}
	console.log('Connected to database');
});

export default db;
