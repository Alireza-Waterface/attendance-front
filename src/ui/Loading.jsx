export default function Loading({ className = "loader" }) {
	if (className === "loader" || className === "loaderMini") {
		return <span className={className}></span>;
	} else {
		throw new Error(
			"You need to pass the right className. 'loader' or 'loaderMini'"
		);
	}
}
