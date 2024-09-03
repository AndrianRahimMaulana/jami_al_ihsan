// Fungsi untuk menghitung saldo
// Untuk menjumlahkan saldo data hari ini, dengan hari kemarin-kemarin nya
export const updateSaldos = (db, callback) => {
	const query = 'SELECT id, pemasukkan, pengeluaran FROM laporan_keuangan ORDER BY id';
	db.query(query, (err, rows) => {
		if (err) return callback(err);

		let saldo = 0;
		let updates = [];

		rows.forEach((row) => {
			saldo += row.pemasukkan - row.pengeluaran;
			updates.push({
				id: row.id,
				saldo: saldo,
			});
		});

		let updateCount = 0;
		updates.forEach((update) => {
			const updateQuery = 'UPDATE laporan_keuangan SET saldo = ? WHERE id = ?';
			db.query(updateQuery, [update.saldo, update.id], (err) => {
				if (err) return callback(err);
				updateCount++;
				if (updateCount === updates.length) callback(null);
			});
		});

		if (updates.length === 0) callback(null);
	});
};
