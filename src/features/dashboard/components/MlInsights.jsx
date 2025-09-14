import { Link } from "react-router-dom";
import ClusterAnalysis from "./ClusterAnalysis";

function MlInsights({ data }) {
	const { anomalies, clusters } = data || {};

	return (
		<div className="bg-gray-50 rounded-lg">
			<h2 className="text-xl font-bold mb-4">تحلیل هوشمند</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h3 className="font-semibold mb-2">
						ناهنجاری‌های شناسایی شده (امروز)
					</h3>
					{anomalies && !anomalies.error && anomalies.length > 0 ? (
						<ul className="list-disc list-inside text-sm text-red-600">
							{anomalies.map((a) => (
								<li
									key={a.record_id}
									className="p-2 bg-red-50 border-l-4 border-red-400"
								>
									<Link to={`/register?search=${a.fullName}`} className="font-bold text-md text-red-500 hover:text-red-700 transition-all">
										{a.fullName}
									</Link>
									<p className="text-red-600">
										{a.explanation}
									</p>
								</li>
							))}
						</ul>
					) : (
						<p className="text-sm text-gray-500">
							{anomalies?.error || "ناهنجاری خاصی یافت نشد."}
						</p>
					)}
				</div>

				<div>
					<ClusterAnalysis clustersData={clusters} />
				</div>
			</div>
		</div>
	);
}

export default MlInsights;
