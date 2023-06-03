<nav>
	<ul>
		<li><a href="/">Characters</a></li>
		<li><a href="/settings/">Settings</a></li>
	</ul>
</nav>

<slot />

<style>
	nav {
		background-color: #333;
		color: #fff;
	}

	nav ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	nav ul li {
		padding: 0.5rem;
	}

	nav ul li a {
		color: #fff;
		text-decoration: none;
	}
</style>
