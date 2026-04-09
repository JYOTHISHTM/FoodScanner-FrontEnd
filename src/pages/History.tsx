

import { useEffect, useState } from "react";
import { getHistory } from "../services/historyService";
import { toggleFavorite, checkFavorite } from "../services/favoritesService";
import { useAuth } from "../hooks/useAuth";

const History = () => {
  const [scans, setScans] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const userId = user?._id;

  const fetchScans = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const data = await getHistory(page, sort, userId);
      setScans(data.scans || []);
      setPages(data.pages || 1);

      const favMap: Record<string, boolean> = {};
      await Promise.all(
        (data.scans || []).map(async (item: any) => {
          if (!item.productId) return;
          try {
            const res = await checkFavorite(userId, item.productId);
            favMap[item.productId] = res.isFavorite;
          } catch {
            favMap[item.productId] = false;
          }
        })
      );
      setFavorites(favMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchScans();
  }, [page, sort, userId]);

  const handleFav = async (productId: string) => {
    if (!userId) return;

    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));

    try {
      await toggleFavorite(userId, productId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">Scan History</h1>

          {scans.length > 0 && (
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="bg-white border border-gray-300 px-5 py-2.5 rounded-2xl text-sm focus:outline-none focus:border-gray-900"
            >
              <option value="">Latest First</option>
              <option value="az">A to Z</option>
              <option value="za">Z to A</option>
              <option value="score">Nutrition Score</option>
            </select>
          )}
        </div>

        {loading && <p className="text-center py-20 text-gray-500">Loading history...</p>}

        {!loading && scans.length === 0 && (
          <div className="text-center py-24">
            <p className="text-7xl mb-4">📖</p>
            <p className="text-xl text-gray-600">No scans yet</p>
            <p className="text-gray-400 mt-2">Your scan history will appear here</p>
          </div>
        )}

        {/* History Items */}
     <div className="space-y-4">
  {scans.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-[0_8px_25px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition"
    >
      {/* LEFT */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Image */}
        <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
          {item.brand && (
            <p className="text-sm text-gray-500 truncate">{item.brand}</p>
          )}
          <p className="text-xs text-gray-400">
            {new Date(item.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {/* Score */}
        <div
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white ${
            item.score > 70
              ? "bg-green-500"
              : item.score > 40
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {item.score}
        </div>

        {/* Favorite */}
        <button
          onClick={() => handleFav(item.productId)}
          className="text-xl hover:scale-110 transition"
        >
          {favorites[item.productId] ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  ))}
</div>

        {/* Simple & Clean Pagination */}
        {scans.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-3xl px-4 py-2 shadow-sm">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-6 py-2 rounded-2xl hover:bg-gray-100 disabled:opacity-40"
              >
                ← Prev
              </button>

              <span className="px-4 font-medium text-gray-700">
                {page} / {pages}
              </span>

              {page < pages && (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-2xl hover:bg-black"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;