import { Link } from "react-router-dom";

export default function ListItem({ link = "", text = "" }) {
	if (!link || !text) return;
	return (
		<li className="bg-amber-300 w-full grid place-items-center py-2 rounded-sm hover:bg-amber-400 cursor-pointer transition-all">
			<Link className="w-full h-full text-center" to={link}>
				{text}
			</Link>
		</li>
	);
}
