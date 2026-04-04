import { useEffect, useState } from "react";
import { getScans } from "../services/scanService";

const ScanHistory = () => {
  const [scans, setScans] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchScans = async () => {
    setLoading(true);
    try {
      const data = await getScans(page, sort);
      setScans(data.scans);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScans();
  }, [page, sort]);

  return (
    <div className="p-6">

      {/* Show controls ONLY if data exists */}
      {scans.length > 0 && (
        <div className="flex justify-between mb-4">
          <select
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Sort</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="score">Score</option>
          </select>
        </div>
      )}

      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Empty */}
      {!loading && scans.length === 0 && (
        <p className="text-center text-gray-500">No scans yet</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scans.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 bg-white shadow rounded-lg p-4"
          >
            <img
              src={item.image}
              className="w-16 h-16 object-contain"
            />

            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              {item.brand && (
                <p className="text-sm text-gray-500">{item.brand}</p>
              )}

              <p className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div
              className={`px-3 py-1 rounded text-white ${item.score > 80
                  ? "bg-green-500"
                  : item.score > 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
            >
              {item.score}
            </div>
          </div>
        ))}
      </div>

      {/* Show pagination ONLY if data exists */}
      {scans.length > 0 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span>{page} / {pages}</span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ScanHistory;