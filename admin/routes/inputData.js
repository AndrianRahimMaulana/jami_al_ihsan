// multer ini package/dependency pihak ketiga yang digunakan untuk multipart/form-data buat mengatasi input. Biasanya digunakan untuk input yang menerima input file
import multer from 'multer';

// path ini module bawaan untuk mendapatkan path file ataupun folder
import path from 'path';

// updateSaldos fungsi untuk menghitung saldo
// Untuk menjumlahkan saldo data hari ini, dengan hari kemarin-kemarin nya
import { updateSaldos } from '../utils/index.js';

// bcrypt ini package/dependency pihak ketiga yang berfungsi untuk enkripsi password, ini digunakan pada saat menambahkan anggota admin. Yang mana password yang kita masukkan misal test1234. Itu bisa jadi string random yang sangat panjang
import bcrypt from 'bcryptjs';

// Buat mendapatkan timestamp waktu
const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, '');

// Buat simpen file gambar
const fileStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		const route = req.originalUrl.split('/')[1];

		switch (route) {
			case 'add-data-banner':
			case 'edit-data-banner':
				if (req.body.category == 'beranda') {
					callback(null, 'assets/images/beranda');
				} else if (req.body.category === 'layanan') {
					callback(null, 'assets/images/layanan');
				} else if (req.body.category === 'kegiatan_masjid') {
					callback(null, 'assets/images/kegiatan-masjid');
				} else if (req.body.category === 'kegiatan_madrasah') {
					callback(null, 'assets/images/kegiatan-madrasah');
				} else if (req.body.category === 'kegiatan_talim') {
					callback(null, 'assets/images/kegiatan-talim');
				}
				break;
			case 'edit-data-sejarah':
				callback(null, 'assets/images/sejarah');
				break;
			case 'add-data-dkm':
			case 'edit-data-dkm':
				callback(null, 'assets/images/struktur-dkm');
				break;
			case 'add-data-remaja':
			case 'edit-data-remaja':
				callback(null, 'assets/images/struktur-remaja');
				break;
			default:
				callback(null, 'assets/images/beranda');
				break;
		}
	},
	filename: (req, file, callback) => {
		callback(null, `${timestamp}_${file.originalname}`);
	},
});

// Buat filter file, wajib hanya menerima file .png, .jpg dan .jpeg
const fileFilter = (req, file, callback) => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		callback(null, true);
	} else {
		callback(new Error('Invalid file type, only JPG, PNG, and JPEG are allowed!'), false);
	}
};

const upload = multer({ storage: fileStorage, fileFilter }).single('file');

const InputData = (app, db) => {
	// Tambah data banner
	app.post('/add-data-banner', upload, async (req, res) => {
		const { category, judul, deskripsi } = req.body;

		// filename untuk mendapatkan nama file gambar nya
		const filename = req.file.originalname;

		// filenameWithoutExtension untuk mendapatkan nama file nya tapi tanpa ekstensi file nya
		const filenameWithoutExtension = path.parse(filename).name;

		// extension untuk mendapatkan ekstensi file nya saja
		const extension = req.file.mimetype;

		// size untuk mendapatkan size file nya saja
		const size = req.file.size;

		try {
			const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${extension}', ${size}, '${timestamp}_${filename}', NOW())`;

			db.query(sqlUploadFile, async (error, result) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (result.affectedRows) {
					const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

					db.query(sqlLastCodeFile, async (err, resultLastCodeFile) => {
						const { code } = resultLastCodeFile[0];

						const sqlAddNewBanner = `INSERT INTO banners (category, judul, deskripsi, gambar, datecreate) VALUES('${category}', '${judul}', '${deskripsi}', ${code}, NOW())`;
						await db.execute(sqlAddNewBanner);
					});
				} else {
					return res.status(500).send({
						status: 'error',
						message: `Gagal menambahkan data banner: ${err}`,
						data: [],
					});
				}
			});

			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mengunggah gambar di banner',
			});
		} catch (error) {
			res.status(500).send('Gagal menambahkan data banner');
		}
	});

	// Ubah data banner
	app.post('/edit-data-banner', upload, async (req, res) => {
		const { banner, judul, deskripsi } = req.body;

		try {
			if (req.file) {
				const { originalname, mimetype, size } = req.file;
				const filenameWithoutExtension = path.parse(originalname).name;

				const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${mimetype}', ${size}, '${timestamp}_${originalname}', NOW())`;

				db.query(sqlUploadFile, async (error, result) => {
					if (error) {
						console.error('Database error: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Database error: ${err}`,
							data: [],
						});
					}

					if (result.affectedRows) {
						const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

						db.query(sqlLastCodeFile, async (error, resultLastCodeFile) => {
							const { code } = resultLastCodeFile[0];

							const sqlUpdateBanner = `UPDATE banners SET judul = ?, deskripsi = ?, gambar = ? WHERE banner = ? `;

							db.query(sqlUpdateBanner, [judul, deskripsi, code, banner], (error, results) => {
								if (error) {
									console.error('Gagal mengubah data banner: ', error);
									return res.status(500).send({
										status: 'error',
										message: `Gagal mengubah data banner: ${err}`,
										data: [],
									});
								}

								return res.status(200).send({
									status: 'success',
									message: `Berhasil mengubah data banner`,
									data: results,
								});
							});
						});
					} else {
						return res.status(500).send({
							status: 'error',
							message: `Gagal menambahkan data banner: ${err}`,
							data: [],
						});
					}
				});
			} else {
				const sqlUpdateBanner = `UPDATE banners SET judul = ?, deskripsi = ? WHERE banner = ? `;

				db.query(sqlUpdateBanner, [judul, deskripsi, banner], (error, results) => {
					if (error) {
						console.error('Gagal mengubah data banner: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Gagal mengubah data banner: ${error}`,
							data: [],
						});
					}

					return res.status(200).send({
						status: 'success',
						message: `Berhasil mengubah data banner`,
						data: results,
					});
				});
			}
		} catch (error) {
			res.status(500).send('Gagal menambahkan data banner');
		}
	});

	// Ubah data tentang kami
	app.post('/edit-data-tentang-kami', upload, async (req, res) => {
		const { deskripsi } = req.body;

		try {
			// Cek kondisi admin ngubah gambar atau gak, kalo ngubah masuk ke if ini
			if (req.file) {
				const { originalname, mimetype, size } = req.file;
				const filenameWithoutExtension = path.parse(originalname).name;

				// Perintah sql untuk menambahkan gambar baru
				const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${mimetype}', ${size}, '${timestamp}_${originalname}', NOW())`;

				db.query(sqlUploadFile, async (error, result) => {
					if (error) {
						console.error('Database error: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Database error: ${err}`,
							data: [],
						});
					}

					// Jika tambah gambar nya berhasil, ambil data gambar nya
					if (result.affectedRows) {
						const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

						db.query(sqlLastCodeFile, async (error, resultLastCodeFile) => {
							const { code } = resultLastCodeFile[0];

							// Lalu update data pada table tentang kami nya sesuai dengan yang diubah oleh admin
							const sqlUpdateBanner = `UPDATE tentang_kami SET deskripsi = ?, gambar = ?`;

							db.query(sqlUpdateBanner, [deskripsi, code], (error, results) => {
								if (error) {
									console.error('Gagal mengubah data tentang kami: ', error);
									return res.status(500).send({
										status: 'error',
										message: `Gagal mengubah data tentang kami: ${err}`,
										data: [],
									});
								}

								return res.status(200).send({
									status: 'success',
									message: `Berhasil mengubah data tentang kami`,
									data: results,
								});
							});
						});
					} else {
						return res.status(500).send({
							status: 'error',
							message: `Gagal menambahkan data tentang kami: ${err}`,
							data: [],
						});
					}
				});
				// Jika user tidak mengubah gambar, maka akan masuk kedalam else
			} else {
				// Lalu update data pada table tentang kami nya sesuai dengan yang diubah oleh admin
				const sqlUpdateBanner = `UPDATE tentang_kami SET deskripsi = ?`;

				db.query(sqlUpdateBanner, [deskripsi], (error, results) => {
					if (error) {
						console.error('Gagal mengubah data tentang kami: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Gagal mengubah data tentang kami: ${error}`,
							data: [],
						});
					}

					return res.status(200).send({
						status: 'success',
						message: `Berhasil mengubah data tentang kami`,
						data: results,
					});
				});
			}
		} catch (error) {
			res.status(500).send('Gagal menambahkan data tentang kami');
		}
	});

	// Ubah data sejarah
	app.post('/edit-data-sejarah', upload, async (req, res) => {
		const { judul, deskripsi } = req.body;

		try {
			// Cek kondisi admin ngubah gambar atau gak, kalo ngubah masuk ke if ini
			if (req.file) {
				const { originalname, mimetype, size } = req.file;
				const filenameWithoutExtension = path.parse(originalname).name;

				// Perintah sql untuk menambahkan gambar baru
				const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${mimetype}', ${size}, '${timestamp}_${originalname}', NOW())`;

				db.query(sqlUploadFile, async (error, result) => {
					if (error) {
						console.error('Database error: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Database error: ${err}`,
							data: [],
						});
					}

					// Jika tambah gambar nya berhasil, ambil data gambar nya
					if (result.affectedRows) {
						const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

						db.query(sqlLastCodeFile, async (error, resultLastCodeFile) => {
							const { code } = resultLastCodeFile[0];

							// Lalu update data pada table sejarah nya sesuai dengan yang diubah oleh admin
							const sqlUpdateBanner = `UPDATE sejarah SET judul = ?, deskripsi = ?, gambar = ?`;

							db.query(sqlUpdateBanner, [judul, deskripsi, code], (error, results) => {
								if (error) {
									console.error('Gagal mengubah data sejarah: ', error);
									return res.status(500).send({
										status: 'error',
										message: `Gagal mengubah data sejarah: ${err}`,
										data: [],
									});
								}

								return res.status(200).send({
									status: 'success',
									message: `Berhasil mengubah data sejarah`,
									data: results,
								});
							});
						});
					} else {
						return res.status(500).send({
							status: 'error',
							message: `Gagal menambahkan data sejarah: ${err}`,
							data: [],
						});
					}
				});
				// Jika user tidak mengubah gambar, maka akan masuk kedalam else
			} else {
				// Lalu update data pada table sejarah nya sesuai dengan yang diubah oleh admin
				const sqlUpdateBanner = `UPDATE sejarah SET judul = ?, deskripsi = ?`;

				db.query(sqlUpdateBanner, [judul, deskripsi], (error, results) => {
					if (error) {
						console.error('Gagal mengubah data sejarah: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Gagal mengubah data sejarah: ${error}`,
							data: [],
						});
					}

					return res.status(200).send({
						status: 'success',
						message: `Berhasil mengubah data sejarah`,
						data: results,
					});
				});
			}
		} catch (error) {
			res.status(500).send('Gagal menambahkan data sejarah');
		}
	});

	// Ubah data jadwal sholat
	app.post('/edit-jadwal-sholat', async (req, res) => {
		const { id: tempId, waktu } = req.body;
		const id = Number(tempId);

		try {
			const sql = `UPDATE jadwal_sholat SET waktu = ? WHERE id = ?`;
			db.query(sql, [waktu, id], (error, results) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Gagal mengubah data jadwal sholat: ${error}`,
						data: [],
					});
				}

				return res.status(200).json({
					status: 'success',
					message: 'Berhasil mengubah data jadwal sholat',
					data: results,
				});
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal mengubah data jadwal sholat: ${error}`,
				data: [],
			});
		}
	});

	// Ubah data kontak
	app.post('/edit-kontak', async (req, res) => {
		const { kontak, value } = req.body;

		try {
			// Beda nya tanda tanya 2 dan 1 adalah
			// Tanda tanya 2 itu nama table yang ada di database
			// Tanda tanya 1 itu nama kolom yang ada didalam table
			const sql = `UPDATE kontak SET ?? = ?`;
			db.query(sql, [kontak, value], (error, results) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Gagal mengubah data kontak: ${error}`,
						data: [],
					});
				}

				return res.status(200).json({
					status: 'success',
					message: 'Berhasil mengubah data kontak',
					data: results,
				});
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal mengubah data kontak: ${error}`,
				data: [],
			});
		}
	});

	app.post('/edit-visi-misi', async (req, res) => {
		const { category, value } = req.body;

		try {
			const sql = `UPDATE visi_misi SET visi_misi = ? WHERE category = ?`;
			db.query(sql, [value, category], (error, results) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Gagal mengubah data visi misi: ${error}`,
						data: [],
					});
				}

				return res.status(200).json({
					status: 'success',
					message: 'Berhasil mengubah data visi misi',
					data: results,
				});
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal mengubah data visi misi: ${error}`,
				data: [],
			});
		}
	});

	// Tambah data anggota DKM
	app.post('/add-data-dkm', upload, async (req, res) => {
		const { nama, jabatan } = req.body;

		const filename = req.file.originalname;
		const filenameWithoutExtension = path.parse(filename).name;
		const extension = req.file.mimetype;
		const size = req.file.size;

		try {
			const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${extension}', ${size}, '${timestamp}_${filename}', NOW())`;

			db.query(sqlUploadFile, async (error, result) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (result.affectedRows) {
					const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

					db.query(sqlLastCodeFile, async (err, resultLastCodeFile) => {
						const { code } = resultLastCodeFile[0];

						const sqlAddNewDKM = `INSERT INTO struktur_dkm (nama, jabatan, gambar, datecreate) VALUES('${nama}', '${jabatan}', ${code}, NOW())`;
						await db.execute(sqlAddNewDKM);
					});
				} else {
					return res.status(500).send({
						status: 'error',
						message: `Gagal menambahkan data anggota DKM: ${err}`,
						data: [],
					});
				}
			});

			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mengunggah gambar anggota dkm',
			});
		} catch (error) {
			res.status(500).send('Gagal menambahkan data anggota dkm');
		}
	});

	// Ubah data anggota DKM
	app.post('/edit-data-dkm', upload, async (req, res) => {
		const { id, nama, jabatan } = req.body;

		try {
			if (req.file) {
				const { originalname, mimetype, size } = req.file;
				const filenameWithoutExtension = path.parse(originalname).name;

				const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${mimetype}', ${size}, '${timestamp}_${originalname}', NOW())`;

				db.query(sqlUploadFile, async (error, result) => {
					if (error) {
						console.error('Database error: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Database error: ${err}`,
							data: [],
						});
					}

					if (result.affectedRows) {
						const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

						db.query(sqlLastCodeFile, async (error, resultLastCodeFile) => {
							const { code } = resultLastCodeFile[0];

							const sqlUpdateDKM = `UPDATE struktur_dkm SET nama = ?, jabatan = ?, gambar = ? WHERE id = ?`;

							db.query(sqlUpdateDKM, [nama, jabatan, code, id], (error, results) => {
								if (error) {
									console.error('Gagal mengubah data anggota DKM: ', error);
									return res.status(500).send({
										status: 'error',
										message: `Gagal mengubah data anggota DKM: ${err}`,
										data: [],
									});
								}

								return res.status(200).send({
									status: 'success',
									message: `Berhasil mengubah data anggota DKM`,
									data: results,
								});
							});
						});
					} else {
						return res.status(500).send({
							status: 'error',
							message: `Gagal menambahkan data anggota DKM: ${err}`,
							data: [],
						});
					}
				});
			} else {
				const sqlUpdateDKM = `UPDATE struktur_dkm SET nama = ?, jabatan = ? WHERE id = ?`;

				db.query(sqlUpdateDKM, [nama, jabatan, id], (error, results) => {
					if (error) {
						console.error('Gagal mengubah data anggota DKM: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Gagal mengubah data anggota DKM: ${error}`,
							data: [],
						});
					}

					return res.status(200).send({
						status: 'success',
						message: `Berhasil mengubah data anggota DKM`,
						data: results,
					});
				});
			}
		} catch (error) {
			res.status(500).send('Gagal menambahkan data anggota DKM');
		}
	});

	// Tambah data anggota remaja
	app.post('/add-data-remaja', upload, async (req, res) => {
		const { nama, jabatan } = req.body;

		const filename = req.file.originalname;
		const filenameWithoutExtension = path.parse(filename).name;
		const extension = req.file.mimetype;
		const size = req.file.size;

		try {
			const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${extension}', ${size}, '${timestamp}_${filename}', NOW())`;

			db.query(sqlUploadFile, async (error, result) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				if (result.affectedRows) {
					const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

					db.query(sqlLastCodeFile, async (err, resultLastCodeFile) => {
						const { code } = resultLastCodeFile[0];

						const sqlAddNewRemaja = `INSERT INTO struktur_remaja (nama, jabatan, gambar, datecreate) VALUES('${nama}', '${jabatan}', ${code}, NOW())`;
						await db.execute(sqlAddNewRemaja);
					});
				} else {
					return res.status(500).send({
						status: 'error',
						message: `Gagal menambahkan data anggota remaja: ${err}`,
						data: [],
					});
				}
			});

			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mengunggah gambar anggota remaja',
			});
		} catch (error) {
			res.status(500).send('Gagal menambahkan data anggota remaja');
		}
	});

	// Ubah data anggota remaja
	app.post('/edit-data-remaja', upload, async (req, res) => {
		const { id, nama, jabatan } = req.body;

		try {
			if (req.file) {
				const { originalname, mimetype, size } = req.file;
				const filenameWithoutExtension = path.parse(originalname).name;

				const sqlUploadFile = `INSERT INTO codes (nama_gambar, ekstensi, ukuran, file_name, datetime) VALUES('${filenameWithoutExtension}', '${mimetype}', ${size}, '${timestamp}_${originalname}', NOW())`;

				db.query(sqlUploadFile, async (error, result) => {
					if (error) {
						console.error('Database error: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Database error: ${err}`,
							data: [],
						});
					}

					if (result.affectedRows) {
						const sqlLastCodeFile = 'SELECT code FROM codes ORDER BY code DESC LIMIT 1';

						db.query(sqlLastCodeFile, async (error, resultLastCodeFile) => {
							const { code } = resultLastCodeFile[0];

							const sqlUpdate = `UPDATE struktur_remaja SET nama = ?, jabatan = ?, gambar = ? WHERE id = ?`;

							db.query(sqlUpdate, [nama, jabatan, code, id], (error, results) => {
								if (error) {
									console.error('Gagal mengubah data anggota Remaja: ', error);
									return res.status(500).send({
										status: 'error',
										message: `Gagal mengubah data anggota Remaja: ${err}`,
										data: [],
									});
								}

								return res.status(200).send({
									status: 'success',
									message: `Berhasil mengubah data anggota Remaja`,
									data: results,
								});
							});
						});
					} else {
						return res.status(500).send({
							status: 'error',
							message: `Gagal menambahkan data anggota Remaja: ${err}`,
							data: [],
						});
					}
				});
			} else {
				const sqlUpdate = `UPDATE struktur_remaja SET nama = ?, jabatan = ? WHERE id = ?`;

				db.query(sqlUpdate, [nama, jabatan, id], (error, results) => {
					if (error) {
						console.error('Gagal mengubah data anggota remaja: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Gagal mengubah data anggota remaja: ${error}`,
							data: [],
						});
					}

					return res.status(200).send({
						status: 'success',
						message: `Berhasil mengubah data anggota remaja`,
						data: results,
					});
				});
			}
		} catch (error) {
			res.status(500).send('Gagal menambahkan data anggota remaja');
		}
	});

	// Tambah data anggota laporan keuangan
	app.post('/add-data-laporan-keuangan', async (req, res) => {
		const { keterangan, pemasukkan, pengeluaran, tanggal } = req.body;

		try {
			// Mendapatkan data saldo terbaru terlebih dahulu untuk ditambah atau dikurang
			const sqlGetLatestSaldo = `SELECT saldo FROM laporan_keuangan ORDER BY id DESC LIMIT 1`;
			db.query(sqlGetLatestSaldo, async (error, results) => {
				// Memunculkan pesan error ketika kode sql nya ada yang bermasalah
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${err}`,
						data: [],
					});
				}

				let saldoBaru;
				if (results.length > 0) {
					// Jika ada data, hitung total berdasarkan total terakhir
					const saldoTerakhir = results[0].saldo;
					saldoBaru = saldoTerakhir + pemasukkan - pengeluaran;
				} else {
					// Jika tidak ada data, total baru sama dengan pemasukkan atau pengeluaran pertama kali
					saldoBaru = pemasukkan - pengeluaran;
				}

				// Menambahkan data laporan keuangan di database
				const sqlAddLaporanKeuangan = `INSERT INTO laporan_keuangan (keterangan, tanggal, pemasukkan, pengeluaran, saldo) VALUES(?, '${tanggal}', ${pemasukkan}, ${pengeluaran}, ${saldoBaru})`;

				db.query(sqlAddLaporanKeuangan, [keterangan], (error, results) => {
					if (error) {
						console.error('Database error: ', error);
						return res.status(500).send({
							status: 'error',
							message: `Database error: ${error}`,
							data: [],
						});
					}

					// Berhasil menambahkan data
					return res.status(200).send({
						status: 'success',
						message: 'Data laporan keuangan berhasil ditambahkan',
						data: results,
					});
				});
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal menambahkan data laporan keuangan: ${error}`,
				data: [],
			});
		}
	});

	// Update data laporan keuangan dan saldo
	app.post('/edit-data-laporan-keuangan', async (req, res) => {
		const { id, keterangan, pemasukkan, pengeluaran, tanggal } = req.body;

		try {
			const saldo = pemasukkan - pengeluaran;

			const sqlUpdateLaporanKeuangan = `UPDATE laporan_keuangan SET keterangan = ?, pemasukkan = ?, pengeluaran = ?, tanggal = ?, saldo = ? WHERE id = ?`;

			db.query(sqlUpdateLaporanKeuangan, [keterangan, pemasukkan, pengeluaran, tanggal, saldo, id], (error, results) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Database error: ${error}`,
						data: [],
					});
				}

				// Update saldo untuk baris-baris berikutnya
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
						message: `Berhasil mengubah data laporan keuangan`,
						data: results,
					});
				});
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal mengubah data laporan keuangan: ${error}`,
				data: [],
			});
		}
	});

	// Tambah data anggota
	app.post('/add-data-anggota', async (req, res) => {
		const { username, name, password: tempPassword, role } = req.body;
		const password = await bcrypt.hash(tempPassword, 10);

		try {
			// Cek dulu username yang dimasukin admin itu udah ada di database atau belum, kalo belum buatkan data nya. Kalo ada harus cari username yang lain
			const sqlCheckUsername = 'SELECT username FROM members WHERE username = ?';
			db.query(sqlCheckUsername, [username], (error, results) => {
				// Jika username nya belom ada di database alias tidak digunakan siapapun
				if (results.length <= 0) {
					const sql = `INSERT INTO members (username, password, name, refresh_token, role, datecreate) VALUES(?, ?, ?, NULL, ?, NOW())`;
					db.query(sql, [username, password, name, role], (error, results) => {
						if (error) {
							console.error('Database error: ', error);
							return res.status(500).send({
								status: 'error',
								message: `Gagal menambahkan data anggota: ${error}`,
								data: [],
							});
						}
						return res.status(200).json({
							status: 'success',
							message: 'Berhasil menambahkan data anggota',
							data: results,
						});
					});
				} else {
					return res.status(403).json({
						status: 'failed',
						message: 'Username tidak dapat digunakan',
						data: [],
					});
				}
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal menambahkan data anggota: ${error}`,
				data: [],
			});
		}
	});

	// Perbarui data anggota
	app.post('/edit-data-anggota', async (req, res) => {
		const { member, username, name, role } = req.body;

		try {
			const sql = `UPDATE members SET username = ?, name = ?, role = ?, refresh_token = NULL WHERE member = ?`;
			db.query(sql, [username, name, role, member], (error, results) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Gagal mengubah data anggota: ${error}`,
						data: [],
					});
				}

				return res.status(200).json({
					status: 'success',
					message: 'Berhasil mengubah data anggota',
					data: results,
				});
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal mengubah data anggota: ${error}`,
				data: [],
			});
		}
	});

	// Ini buat pengguna lain jika ingin memberikan komentar
	app.post('/add-pesan', async (req, res) => {
		const { nama, email, pesan } = req.body;

		try {
			// Perintah sql untuk menambahkan data komentar dari pengguna
			const sql = `INSERT INTO komentar VALUES(0, ?, ?, ?)`;
			db.query(sql, [nama, email, pesan], (error, results) => {
				if (error) {
					console.error('Database error: ', error);
					return res.status(500).send({
						status: 'error',
						message: `Gagal menambahkan komentar: ${error}`,
						data: [],
					});
				}

				return res.status(200).json({
					status: 'success',
					message: 'Berhasil menambahkan komentar',
				});
			});
		} catch (error) {
			return res.status(500).send({
				status: 'error',
				message: `Gagal menambahkan komentar: ${error}`,
				data: [],
			});
		}
	});
};

export default InputData;
