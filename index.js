import express from 'express';
import bodyParser from 'body-parser';
import db from '../config/db.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import InputData from './inputData.js';
import { updateSaldos } from '../utils/index.js';

dotenv.config();

const app = express();

// ini CORS buat masalah ketika client meminta API dari backend biar gak ke block CORS
app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5501' }));
app.use(cookieParser());

// Ini buat menentukan port biasanya bebas dan biasanya hanya 4 digit
const port = 3008;

app.use(bodyParser.json());

// Buat dapetin gambar banner dari database
app.post('/banner', async (req, res) => {
	const { category } = req.body;

	try {
		// Perintah sql untuk mengambil data gambar berdasarkan category dari table banners
		const sql = 'SELECT gambar FROM banners WHERE category = ?';
		db.query(sql, [category], async (err, results) => {
			if (err) {
				console.error('Database error: ', err);
				return res.status(500).send({
					status: 'error',
					message: `Database error: ${err}`,
					data: [],
				});
			}

			// Ini buat cek datanya yang di database itu ada gak, kalo gak ada maka munculin status 404
			if (results.length <= 0) {
				return res.status(404).json(results);
			}

			const promises = results.map((result) => {
				const { gambar } = result;

				// Perintah sql untuk mengambil data banner, judul, deskripsi, file_name berdasarkawn category
				const sql2 = `SELECT banner, judul, deskripsi, file_name
					FROM banners
					JOIN codes ON banners.gambar = codes.code
					WHERE banners.gambar = ?`;

				return new Promise((resolve, reject) => {
					db.query(sql2, [gambar], (err, results) => {
						if (err) {
							return reject(err);
						}
						resolve(results);
					});
				});
			});

			try {
				// Kode untuk menggabungkan semua data hasil dari perintah sql diatas
				const allResults = await Promise.all(promises);
				const mergedResults = allResults.flat();
				res.status(200).json(mergedResults);
			} catch (error) {
				console.error('Database error: ', error);
				return res.status(500).send({
					status: 'error',
					message: `Database error: ${err}`,
					data: [],
				});
			}
		});
	} catch (error) {
		res.status(500).send('Tidak bisa mendapatkan gambar banner karena ada masalah di server');
	}
});

// Buat dapetin data tentang kami dari database
app.get('/tentang-kami', async (req, res) => {
	try {
		// Mengambil data dari kolom gambar dari table tentang_kami di database
		const sql = 'SELECT gambar FROM tentang_kami';
		db.query(sql, (err, results) => {
			if (err) {
				console.error('Database error: ', err);
				return res.status(500).send({
					status: 'error',
					message: `Database error: ${err}`,
					data: [],
				});
			}

			const code = results[0].gambar;

			// Mengambil data dari kolom deskripsi, file_name dari table tentang_kami di database dan juga table codes
			const sql2 = `SELECT deskripsi, file_name
FROM tentang_kami
JOIN codes ON tentang_kami.gambar= codes.code
WHERE tentang_kami.gambar = ?`;
			db.query(sql2, [code], (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				return res.status(200).send({
					status: 'success',
					message: `Berhasil mendapatkan data tentang kami`,
					data: results,
				});
			});
		});
	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: `Tidak bisa mendapatkan data tentang kami karena ada masalah di server: ${error}`,
			data: [],
		});
	}
});

// Buat dapetin data jadwal sholat dari database
app.post('/jadwal-sholat', async (req, res) => {
	const { id_jadwal } = req.body;

	try {
		if (id_jadwal) {
			// Mengambil semua data kolom dari table jadwal sholat di database tapi berdasarkan id yang dipilih
			const sql = `SELECT * FROM jadwal_sholat WHERE id = ?`;
			db.query(sql, [id_jadwal], (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				res.status(200).json({
					status: 'success',
					message: `Berhasil mendapatakn data jadwal sholat`,
					data: results,
				});
			});
		} else {
			// Mengambil semua data kolom dari table jadwal sholat di database
			const sql = `SELECT * FROM jadwal_sholat`;
			db.query(sql, (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				res.status(200).json({
					status: 'success',
					message: `Berhasil mendapatakn data jadwal sholat`,
					data: results,
				});
			});
		}
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Tidak bisa mendapatkan data jadwal sholat karena ada masalah di server: ${err}`,
			data: [],
		});
	}
});

// Buat dapetin data kontak dari database
app.post('/kontak', async (req, res) => {
	const { kontak } = req.body;

	try {
		if (kontak) {
			// Yang tanda tanya dua (??) itu maksudnya adalah nama kolom dinamis yang akan berikan
			const sql = `SELECT ?? FROM kontak`;
			// Nah kan ada [kontak] yang didapat dari variable kontak di req.body atas, req.body itu sesuai inputan pengguna/user
			db.query(sql, [kontak], (err, results) => {
				console.log(results);
				if (err) {
					console.error('Database error: ', err);
					res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				res.status(200).json({
					status: 'success',
					message: `Berhasil mendapatakn data kontak`,
					data: results,
				});
			});
		} else {
			// Mengambil semua data kolom dari kontak di database
			const sql = `SELECT * FROM kontak`;
			db.query(sql, (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				res.status(200).json({
					status: 'success',
					message: `Berhasil mendapatakn data kontak`,
					data: results,
				});
			});
		}
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `Tidak bisa mendapatkan data kontak karena ada masalah di server: ${err}`,
			data: [],
		});
	}
});

// Buat dapetin data visi dan misi dari database
app.post('/visi-misi', async (req, res) => {
	const { category, value } = req.body;

	try {
		if (category) {
			// Mengambil semua data kolom dari table visi_moso di database tapi berdasarkan category yang dipilih
			const sql = `SELECT * FROM visi_misi WHERE category = ?`;
			db.query(sql, [category], (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				res.status(200).json({
					status: 'success',
					message: `Berhasil mendapatakn data visi misi`,
					data: results,
				});
			});
		} else {
			// Mengambil semua data kolom dari table visi_misi di database
			const sql = `SELECT * FROM visi_misi`;
			db.query(sql, (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				res.status(200).json({
					status: 'success',
					message: `Berhasil mendapatakn data visi misi`,
					data: results,
				});
			});
		}
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: `'Tidak bisa mendapatkan data visi dan misi karena ada masalah di server': ${err}`,
			data: [],
		});
	}
});

// Buat dapetin data sejarah dari database
app.get('/sejarah', async (req, res) => {
	try {
		// Mengambil semua data kolom gambar dari table sejarah di database
		const sql = 'SELECT gambar FROM sejarah';
		db.query(sql, (err, results) => {
			if (err) {
				console.error('Database error: ', err);
				return res.status(500).send({
					status: 'error',
					message: `Database error: ${err}`,
					data: [],
				});
			}

			const code = results[0].gambar;

			// Mengambil data dari kolom judul, deskripsi, file_name dari table sejarah di database dan juga table codes
			const sql2 = `SELECT judul, deskripsi, file_name
FROM sejarah
JOIN codes ON sejarah.gambar= codes.code
WHERE sejarah.gambar = ?`;
			db.query(sql2, [code], (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
				return res.status(200).send({
					status: 'success',
					message: `Berhasil mendapatkan data tentang kami`,
					data: results,
				});
			});
		});
	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: `Tidak bisa mendapatkan data sejarah karena ada masalah di server: ${error}`,
			data: [],
		});
	}
});

// Buat dapetin data struktur DKM dari database
app.post('/struktur-dkm', async (req, res) => {
	const { id } = req.body;
	try {
		if (id) {
			// Mengambil data dari kolom nama, jabatan dan gambar dari table struktur_dkm di database tapi spesifik sesuai dengan id nya
			const sql = 'SELECT id, nama, jabatan, gambar FROM struktur_dkm WHERE id = ?';
			db.query(sql, [id], async (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (results.length <= 0) {
					return res.status(500).send({
						status: 'failed',
						message: `Tidak ada anggota DKM`,
						data: [],
					});
				}

				const promises = results.map((result) => {
					const { gambar } = result;

					// Mengambil data dari kolom nama, jabatan, file_name dari table struktur_dkm di database dan juga table codes
					const sql2 = `SELECT id, nama, jabatan, file_name
					FROM struktur_dkm
					JOIN codes ON struktur_dkm.gambar = codes.code
					WHERE struktur_dkm.gambar = ?`;

					return new Promise((resolve, reject) => {
						db.query(sql2, [gambar], (err, results) => {
							if (err) {
								return reject(err);
							}
							resolve(results);
						});
					});
				});

				try {
					const allResults = await Promise.all(promises);
					const mergedResults = allResults.flat();

					return res.json({
						message: `Berhasil menampilkan data anggota DKM`,
						status: 'success',
						data: mergedResults,
					});
				} catch (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
			});
		} else {
			// Mengambil data dari kolom nama, jabatan dan gambar dari table struktur_dkm di database
			const sql = 'SELECT id, nama, jabatan, gambar FROM struktur_dkm';
			db.query(sql, async (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (results.length <= 0) {
					return res.status(500).send({
						status: 'failed',
						message: `Tidak ada anggota DKM`,
						data: [],
					});
				}

				const promises = results.map((result) => {
					const { gambar } = result;

					// Mengambil data dari kolom nama, jabatan, file_name dari table struktur_dkm di database dan juga table codes
					const sql2 = `SELECT id, nama, jabatan, file_name
					FROM struktur_dkm
					JOIN codes ON struktur_dkm.gambar = codes.code
					WHERE struktur_dkm.gambar = ?`;

					return new Promise((resolve, reject) => {
						db.query(sql2, [gambar], (err, results) => {
							if (err) {
								return reject(err);
							}
							resolve(results);
						});
					});
				});

				// Berhasil dapetin semua data anggota DKM
				try {
					const allResults = await Promise.all(promises);
					const mergedResults = allResults.flat();
					return res.json({
						message: `Berhasil menampilkan data anggota DKM`,
						status: 'success',
						data: mergedResults,
					});
				} catch (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
			});
		}
	} catch (error) {
		res.status(500).send('Tidak bisa mendapatkan data struktur DKM karena ada masalah di server');
	}
});

// Buat dapetin data struktur remaja dari database
app.post('/struktur-remaja', async (req, res) => {
	const { id } = req.body;
	try {
		if (id) {
			// Mengambil data dari kolom nama, jabatan dan gambar dari table struktur_remaja di database tapi spesifik sesuai dengan id nya
			const sql = 'SELECT id, nama, jabatan, gambar FROM struktur_remaja WHERE id = ?';
			db.query(sql, [id], async (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (results.length <= 0) {
					return res.status(500).send({
						status: 'failed',
						message: `Tidak ada anggota remaja`,
						data: [],
					});
				}

				const promises = results.map((result) => {
					const { gambar } = result;

					// Mengambil data dari kolom nama, jabatan, file_name dari table struktur_remaja di database dan juga table codes
					const sql2 = `SELECT id, nama, jabatan, file_name
					FROM struktur_remaja
					JOIN codes ON struktur_remaja.gambar = codes.code
					WHERE struktur_remaja.gambar = ?`;

					return new Promise((resolve, reject) => {
						db.query(sql2, [gambar], (err, results) => {
							if (err) {
								return reject(err);
							}
							resolve(results);
						});
					});
				});

				try {
					const allResults = await Promise.all(promises);
					const mergedResults = allResults.flat();

					return res.json({
						message: `Berhasil menampilkan data anggota remaja`,
						status: 'success',
						data: mergedResults,
					});
				} catch (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
			});
		} else {
			// Mengambil data dari kolom nama, jabatan dan gambar dari table struktur_remaja di database
			const sql = 'SELECT id, nama, jabatan, gambar FROM struktur_remaja';
			db.query(sql, async (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (results.length <= 0) {
					return res.status(500).send({
						status: 'failed',
						message: `Tidak ada anggota remaja`,
						data: [],
					});
				}

				const promises = results.map((result) => {
					const { gambar } = result;

					// Mengambil data dari kolom nama, jabatan, file_name dari table struktur_remaja di database dan juga table codes
					const sql2 = `SELECT id, nama, jabatan, file_name
					FROM struktur_remaja
					JOIN codes ON struktur_remaja.gambar = codes.code
					WHERE struktur_remaja.gambar = ?`;

					return new Promise((resolve, reject) => {
						db.query(sql2, [gambar], (err, results) => {
							if (err) {
								return reject(err);
							}
							resolve(results);
						});
					});
				});

				// Berhasil dapetin data anggota remaja
				try {
					const allResults = await Promise.all(promises);
					const mergedResults = allResults.flat();
					return res.json({
						message: `Berhasil menampilkan data anggota remaja`,
						status: 'success',
						data: mergedResults,
					});
				} catch (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}
			});
		}
	} catch (error) {
		res.status(500).send('Tidak bisa mendapatkan data struktur remaja karena ada masalah di server');
	}
});

// Dari sini sampai akhir khusus untuk halaman admin
// Mendapatkan data banner secara spesifik
app.post('/banner-specific', async (req, res) => {
	const { banner } = req.body;

	// Mengambil data dari kolom judul, deskripsi, gambar dari table banners di database berdasarkan banner
	const query = 'SELECT judul, deskripsi, gambar FROM banners WHERE banner = ?';
	db.query(query, [banner], (err, results) => {
		if (err) {
			return res.status(500).json({
				message: `Gagal mendapatkan data banner`,
				status: 'error',
				data: [],
			});
		}

		if (results.length === 0) {
			return res.status(500).json({
				message: `Tidak ada data banner`,
				status: 'failed',
				data: [],
			});
		}

		const { judul, deskripsi, gambar } = results[0];

		// Mengambil data dari kolom code, nama_gambar, file_name dari table codes di database berdasarkan code
		const sql2 = `SELECT code, nama_gambar, file_name FROM codes WHERE code = ${gambar}`;

		db.query(sql2, (err, results) => {
			if (err) {
				return res.status(500).json({
					message: `Gagal mendapatkan data banner`,
					status: 'error',
					data: [],
				});
			}

			if (results.length === 0) {
				return res.status(500).json({
					message: `Tidak ada data banner`,
					status: 'failed',
					data: [],
				});
			}

			return res.json({
				message: `Berhasil menampilkan data banner`,
				status: 'success',
				data: [
					{
						judul: judul,
						deskripsi: deskripsi,
						fileName: results[0].nama_gambar,
						file: results[0].file_name,
					},
				],
			});
		});
	});
});

// Mengambil data laporan keuangan
app.post('/laporan-keuangan', async (req, res) => {
	const { id } = req.body;

	try {
		if (id) {
			// Mengambil data dari kolom keterangan, tanggal, pemasukkan, pengeluaran, saldo dari table laporan_keuangan di database tapi spesifik sesuai dengan id nya
			const sql = 'SELECT id, keterangan, tanggal, pemasukkan, pengeluaran, saldo FROM laporan_keuangan WHERE id = ?';
			db.query(sql, [id], async (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (results.length <= 0) {
					return res.status(500).send({
						status: 'failed',
						message: `Tidak ada data laporan keuangan`,
						data: [],
					});
				}

				return res.json({
					message: `Berhasil menampilkan data laporan keuangan`,
					status: 'success',
					data: results,
				});
			});
		} else {
			// Mengambil data dari kolom keterangan, tanggal, pemasukkan, pengeluaran, saldo dari table laporan_keuangan di database
			const sql = 'SELECT id, keterangan, tanggal, pemasukkan, pengeluaran, saldo FROM laporan_keuangan';
			db.query(sql, async (err, results) => {
				if (err) {
					console.error('Database error: ', err);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (results.length <= 0) {
					return res.status(500).send({
						status: 'failed',
						message: `Tidak ada data laporan keuangan`,
						data: [],
					});
				}

				return res.json({
					message: `Berhasil menampilkan data laporan keuangan`,
					status: 'success',
					data: results,
				});
			});
		}
	} catch (error) {
		return res.status(500).send({
			status: 'error',
			message: `Tidak bisa mendapatkan data laporan keuangan karena ada masalah di server: ${err}`,
			data: [],
		});
	}
});

app.post('/filter-laporan-keuangan', async (req, res) => {
	const { bulan, tahun } = req.body;

	const getPreviousMonth = (month, year) => {
		if (month === '01') {
			return { prevMonth: '12', prevYear: (parseInt(year) - 1).toString() };
		}
		return {
			prevMonth: (parseInt(month) - 1).toString().padStart(2, '0'),
			prevYear: year,
		};
	};

	const { prevMonth, prevYear } = getPreviousMonth(bulan, tahun);

	// Query untuk data bulan ini
	const sqlCurrent = 'SELECT id, keterangan, tanggal, pemasukkan, pengeluaran, saldo FROM laporan_keuangan WHERE MONTH(tanggal) = ? AND YEAR(tanggal) = ? ORDER BY tanggal';

	// Query untuk total bulan sebelumnya
	const sqlPrevious = 'SELECT SUM(pemasukkan) as totalPemasukkan, SUM(pengeluaran) as totalPengeluaran, SUM(pemasukkan) - SUM(pengeluaran) as saldoAkhir FROM laporan_keuangan WHERE MONTH(tanggal) = ? AND YEAR(tanggal) = ?';

	// Query untuk total bulan ini
	const sqlCurrentTotal = 'SELECT SUM(pemasukkan) as totalPemasukkan, SUM(pengeluaran) as totalPengeluaran, SUM(pemasukkan) - SUM(pengeluaran) as saldoAkhir FROM laporan_keuangan WHERE MONTH(tanggal) = ? AND YEAR(tanggal) = ?';

	try {
		const [currentResults, previousResults, currentTotalResults] = await Promise.all([
			new Promise((resolve, reject) => {
				db.query(sqlCurrent, [bulan, tahun], (err, results) => {
					if (err) reject(err);
					else resolve(results);
				});
			}),
			new Promise((resolve, reject) => {
				db.query(sqlPrevious, [prevMonth, prevYear], (err, results) => {
					if (err) reject(err);
					else resolve(results[0]);
				});
			}),
			new Promise((resolve, reject) => {
				db.query(sqlCurrentTotal, [bulan, tahun], (err, results) => {
					if (err) reject(err);
					else resolve(results[0]);
				});
			}),
		]);

		if (currentResults.length <= 0) {
			return res.json({
				status: 'failed',
				message: `Tidak ada data laporan keuangan`,
				data: { current: [], previous: null, currentTotal: null },
			});
		}

		return res.json({
			message: `Berhasil menampilkan data laporan keuangan`,
			status: 'success',
			data: {
				current: currentResults,
				previous: previousResults,
				currentTotal: currentTotalResults,
				prevMonth,
				prevYear,
			},
		});
	} catch (err) {
		console.error('Database error: ', err);
		return res.status(500).send({
			status: 'error',
			message: `Database error: ${err}`,
			data: { current: [], previous: null, currentTotal: null },
		});
	}
});

// Melakukan login
app.post('/login', async (req, res) => {
	const { username, password } = req.body;

	// Query untuk mencari user di database
	const query = 'SELECT member, username, name, password FROM members WHERE username = ?';

	db.query(query, [username], (err, results) => {
		if (err) {
			return res.status(500).json({
				auth: false,
				token: '',
				message: 'Database query bermasalah',
				status: 'error',
			});
		}

		if (results.length === 0) {
			return res.status(400).json({
				auth: false,
				token: '',
				message: 'Tidak menemukan akun',
				status: 'failed',
			});
		}

		const user = results[0];

		const passwordIsValid = bcrypt.compareSync(password, user.password);

		if (!passwordIsValid) {
			return res.status(400).json({
				auth: false,
				token: '',
				message: 'Username atau password salah',
				status: 'failed',
			});
		}

		const accessToken = jwt.sign({ member: user.member, name: user.name, username: user.username }, process.env.ACCESS_TOKEN, { expiresIn: '20s' });
		const refreshToken = jwt.sign({ member: user.member }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });

		const queryUpdateRefreshToken = `UPDATE members SET refresh_token = ? WHERE member = ?`;

		db.query(queryUpdateRefreshToken, [refreshToken, user.member], (err, results) => {
			if (err) {
				return res.status(500).json({
					message: 'Gagal memperbarui refresh token',
					status: 'error',
				});
			}

			res.json({ auth: true, accessToken, message: 'Kamu berhasil login', status: 'success', token: refreshToken, number: user.member });
		});
	});
});

// Refresh token untuk dapat token baru
app.post('/token', async (req, res) => {
	const { refreshToken } = req.body;

	// Kalo gak ada token nya di localStorage berarti admin belom login
	if (!refreshToken) {
		return res.status(401).json({
			message: 'Belum login',
			status: 'failed',
		});
	}

	// Cek token nya apakah sama yang ada di database atau tidak
	const query = `SELECT refresh_token, member, role FROM members WHERE refresh_token = ?`;

	db.query(query, [refreshToken], (err, results) => {
		// Jika tidak sama artinya token tidak valid, alhasil admin otomatis akan keluar
		if (results.length === 0 || !results || err) {
			return res.status(403).json({
				message: 'Token tidak valid',
				status: 'failed',
			});
		}

		// Jika sama artinya token valid, dan admin bisa memasuki dashboard admin
		return res.status(200).json({
			message: 'Token valid',
			status: 'success',
			data: results,
		});
	});
});

// Logout
app.delete('/logout', async (req, res) => {
	const { member, refreshToken } = req.body;

	// Ketika ingin logout di cari dulu token yang ada di database
	const query = `SELECT refresh_token FROM members WHERE refresh_token = ?`;

	db.query(query, [refreshToken], (err, results) => {
		// Kalo gak ada token yang dicari maka gagal keluar
		if (results.length === 0 || !results || err) {
			return res.status(204).json({
				message: 'Gagal keluar',
				status: 'error',
			});
		}

		// Lalu set token yang ada di database jadi NULL alias kosong
		const queryUpdateRefreshToken = `UPDATE members SET refresh_token = null WHERE member = ?`;
		db.query(queryUpdateRefreshToken, [member], (err, results) => {
			if (err) {
				return res.status(500).json({
					message: 'Gagal memperbarui refresh token',
					status: 'error',
				});
			}

			res.clearCookie('refreshToken');
			return res.json({
				message: 'Kamu telah keluar',
				status: 'success',
			});
		});
	});
});

// Dapetin semua data anggota admin
app.post('/users', async (req, res) => {
	const { member } = req.body;

	if (member) {
		// Mengambil data anggota admin secara spesifik berdasarkan id member nya
		const query = 'SELECT username, name, role FROM members WHERE member = ?';
		db.query(query, [member], (err, results) => {
			if (err) {
				return res.status(500).json({
					message: 'Gagal mendapatkan data user',
					status: 'error',
				});
			}

			if (results.length === 0) {
				return res.status(500).json({
					message: 'Tidak ada user',
					status: 'failed',
				});
			}

			return res.json({
				message: 'Berhasil menampilkan user',
				status: 'success',
				data: results,
			});
		});
	} else {
		// Mengambil semua data anggota admin
		const query = 'SELECT member, name, username, role FROM members';
		db.query(query, (err, results) => {
			if (err) {
				return res.status(500).json({
					message: 'Gagal mendapatkan semua data user',
					status: 'error',
				});
			}

			if (results.length === 0) {
				return res.status(500).json({
					message: 'Tidak ada user satupun',
					status: 'failed',
				});
			}

			return res.json({
				message: 'Berhasil menampilkan semua user',
				status: 'success',
				data: results,
			});
		});
	}
});

// Delete data sesuai path route nya
app.post('/delete-banner-beranda', (req, res) => {
	const { table, id } = req.body;

	// Query untuk menghapus data sesuai dengan table yang dipilih, ada di function deleteData
	const sql = 'DELETE FROM ?? WHERE banner = ?';
	db.query(sql, [table, id], (err, results) => {
		if (err) {
			// Mengembalikan data json ketika data banner berhasil dihapus
			return res.status(500).json({
				message: `Gagal menghapus data banner: ${err}`,
				status: 'error',
				data: [],
			});
		}

		// Mengembalikan data json ketika data banner berhasil dihapus
		return res.json({
			message: `Berhasil menghapus data banner`,
			status: 'success',
			data: results,
		});
	});
});

// Delete data sesuai struktur DKM
app.delete('/delete-data-dkm', (req, res) => {
	const { id } = req.body;

	// Query untuk menghapus data sesuai dengan table yang dipilih, ada di function deleteData
	const sql = 'DELETE FROM struktur_dkm WHERE id = ?';
	db.query(sql, [id], (err, results) => {
		if (err) {
			// Mengembalikan data json ketika data anggota dkm berhasil dihapus
			return res.status(500).json({
				message: `Gagal menghapus data anggota DKM: ${err}`,
				status: 'error',
				data: [],
			});
		}

		// Mengembalikan data json ketika data banner berhasil dihapus
		return res.json({
			message: `Berhasil menghapus data anggota DKM`,
			status: 'success',
			data: results,
		});
	});
});

// Delete data sesuai struktur remaja
app.delete('/delete-data-remaja', (req, res) => {
	const { id } = req.body;

	// Query untuk menghapus data sesuai dengan table yang dipilih, ada di function deleteData
	const sql = 'DELETE FROM struktur_remaja WHERE id = ?';
	db.query(sql, [id], (err, results) => {
		if (err) {
			// Mengembalikan data json ketika data anggota remaja berhasil dihapus
			return res.status(500).json({
				message: `Gagal menghapus data anggota remaja: ${err}`,
				status: 'error',
				data: [],
			});
		}

		// Mengembalikan data json ketika data remaja berhasil dihapus
		return res.json({
			message: `Berhasil menghapus data anggota remaja`,
			status: 'success',
			data: results,
		});
	});
});

// Delete data untuk laporan keuangan
app.delete('/delete-data-laporan-keuangan', (req, res) => {
	const { id } = req.body;

	// Menghapus data
	const sqlDeleteData = 'DELETE FROM laporan_keuangan WHERE id = ?';
	db.query(sqlDeleteData, [id], (error, results) => {
		if (error) {
			console.error('Database error: ', error);
			return res.status(500).send({
				status: 'error',
				message: `Database error: ${error}`,
				data: [],
			});
		}

		// Update saldo setelah penghapusan
		updateSaldos(db, (err) => {
			if (err) {
				console.error('Error updating saldos: ', err);
				return res.status(500).send({
					status: 'error',
					message: `Error updating saldos: ${err}`,
					data: [],
				});
			}

			return res.status(200).send({
				status: 'success',
				message: `Berhasil menghapus data laporan keuangan`,
				data: results,
			});
		});
	});
});

// Delete data anggota
app.delete('/delete-data-anggota', (req, res) => {
	const { member } = req.body;

	// Query untuk menghapus data sesuai dengan table yang dipilih, ada di function deleteData
	const sql = 'DELETE FROM members WHERE member = ?';
	db.query(sql, [member], (err, results) => {
		if (err) {
			// Mengembalikan data json ketika data anggota gagal dihapus
			return res.status(500).json({
				message: `Gagal menghapus data anggota: ${err}`,
				status: 'error',
				data: [],
			});
		}

		// Mengembalikan data json ketika data berhasil dihapus
		return res.json({
			message: `Berhasil menghapus data anggota`,
			status: 'success',
			data: results,
		});
	});
});

// Daftar komentar pengguna
app.get('/komentar-pengguna', (req, res) => {
	// Query sql untuk mendapatkan semua data komentar pengguna seperti nama, email dan pesan dari table komentar
	const sql = 'SELECT nama, email, pesan FROM komentar';
	db.query(sql, (err, results) => {
		if (err) {
			// Mengembalikan data json ketika data komentar gagal dimuat
			return res.status(500).json({
				message: `Gagal mengambil data komentar: ${err}`,
				status: 'error',
				data: [],
			});
		}

		// Mengembalikan data json ketika data komentar berhasil dimuat
		return res.json({
			message: `Berhasil mengambil data komentar`,
			status: 'success',
			data: results,
		});
	});
});

// Fungsi untuk input atau upload
InputData(app, db);

app.listen(port, () => console.log(`Server running at port ${port}`));
