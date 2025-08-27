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
								<li key={a.record_id}>{a.fullName}</li>
							))}
						</ul>
					) : (
						<p className="text-sm text-gray-500">
							{anomalies?.error || "ناهنجاری خاصی یافت نشد."}
						</p>
					)}
				</div>
				<div>
					<h3 className="font-semibold mb-2">
						خوشه‌بندی رفتاری کاربران
					</h3>
					{clusters && !clusters.error && clusters.length > 0 ? (
						<p className="text-sm text-gray-500">
							تحلیل خوشه‌بندی برای {clusters.length} کاربر انجام
							شد.
						</p>
					) : (
						// Here you could add a pie chart showing cluster distribution
						<p className="text-sm text-gray-500">
							{clusters?.error ||
								"داده کافی برای تحلیل خوشه‌بندی وجود ندارد."}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default MlInsights;
