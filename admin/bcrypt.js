import bcrypt from 'bcryptjs';
import readline from 'readline';

// Fungsi untuk meng-generate hash bcrypt dari password
function generateHash(password) {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

// Membuat interface readline untuk membaca input dari pengguna
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true,
});

// Prompt untuk meminta password dari pengguna
rl.question('Masukkan password: ', (password) => {
	if (!password) {
		console.error('Harap masukkan password.');
		rl.close();
		process.exit(1);
	}

	const hashedPassword = generateHash(password);
	console.log(`Password: ${password}`);
	console.log(`Hash: ${hashedPassword}`);

	// Menutup readline interface
	rl.close();
});
