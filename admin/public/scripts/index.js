window.addEventListener('DOMContentLoaded', () => {
	const refreshToken = localStorage.getItem('token');
	const member = localStorage.getItem('number');
	const menusHide = document.querySelectorAll('.menu-hide');

	const checkToken = async () => {
		const request = await fetch(`http://localhost:3008/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refreshToken }),
		});
		const results = await request.json();

		if (results.status === 'failed') {
			alert('Login terlebih dahulu');
			localStorage.clear();
			window.location.href = '../index.html';
			return;
		}

		// Mendapatkan URL saat ini
		const currentUrl = window.location.href;

		// Mendapatkan bagian terakhir dari URL setelah "/"
		const parts = currentUrl.split('/');
		const lastPart = parts[parts.length - 1];

		// Menghapus ".html" dari bagian terakhir
		const name = lastPart.replace('.html', '');

		const data = results.data[0];
		if (data.role !== 'super_user') {
			menusHide.forEach((menuHide) => {
				menuHide.classList.add('d-none');
			});

			// Cek jika admin alias bukan super_user berada dihalaman Anggota ataupun Komentar, maka kembalikan dia ke halaman dashboard/beranda admin
			if (name === 'Anggota' || name === 'Komentar') {
				window.location.href = 'index.html';
			}
		}
	};

	checkToken();

	const menuLogout = document.getElementById('logout-menu');
	menuLogout.addEventListener('click', async (e) => {
		e.preventDefault();

		const request = await fetch(`http://localhost:3008/logout`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refreshToken, member }),
		});
		const results = await request.json();

		console.log(results);
		if (results.status === 'success') {
			localStorage.clear();
			window.location.href = '../index.html';
		}
	});
});
