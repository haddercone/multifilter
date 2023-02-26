import { useState, useEffect } from "react";

function App() {
	const [users, setUsers] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [query, setQuery] = useState("");

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((json) => {
				setUsers(json);
				setIsLoaded(true);
			});
	}, []);

	// using derived state from users to filter the data
	const filteredUsers = users.filter((user) => {
		const filterUserByname = user.name
			.toLowerCase()
			.includes(query.toLowerCase());
		const filterUserByEmail = user.email
			.toLowerCase()
			.includes(query.toLowerCase());
		const filterUserByUserName = user.username
			.toLowerCase()
			.includes(query.toLowerCase());

		if (filterUserByEmail) {
			return filterUserByEmail;
		} else if (filterUserByname) {
			return filterUserByname;
		} else if (filterUserByUserName) {
			return filterUserByUserName;
		} else {
			return null;
		}
	});

	return (
		<div className="App">
			<input
				style={{ padding: "5px ", margin: "1rem" }}
				type="text"
				placeholder="Search Users... "
				value={query}
				autoFocus={true}
				onChange={(e) => {
					setQuery(e.target.value);
				}}
			/>
			<br />
			{!isLoaded ? (
				"loading..."
			) : (
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							fontWeight: "bold",
						}}
					>
						<p style={{ width: "30%" }}>Name</p>
						<p style={{ width: "30%" }}>User Name</p>
						<p style={{ width: "30%" }}>Email</p>
					</div>
					{filteredUsers.map((user, index) => {
						return (
							<div
								key={user.id}
								style={{
									display: "flex",
									gap: "1rem",
									justifyContent: "center",
									backgroundColor: index % 2 === 0 ? "#eee  " : "white",
								}}
							>
								<p style={{ width: "30%" }}>{user.name}</p>
								<p style={{ width: "30%" }}>{user.username}</p>
								<p style={{ width: "30%" }}>{user.email}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default App;
