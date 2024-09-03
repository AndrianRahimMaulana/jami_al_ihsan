import mysql from 'mysql2';

// Koneksi ke database
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'masjid_jami_al_ihsan',
});
db.connect((err) => {
	if (err) {
		console.error('Database connection error: ', err);
		return;
	}
	console.log('Connected to database');
});

export default db;
