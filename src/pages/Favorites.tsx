

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "../services/favoritesService";
import { useAuth } from "../hooks/useAuth";

const Favorites = () => {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const { user } = useAuth();
  const userId = user?._id;

  const fetchData = async () => {
    if (!userId) return;

    const data = await getFavorites(page, sort, search, userId);

    setData(data.favorites || []);
    setPages(data.pages || 1);
  };

  useEffect(() => {
    if (!userId) return;
    fetchData();
  }, [page, sort, search, userId]);

  const handleToggle = async (productId: string) => {
    if (!userId) return;

    await toggleFavorite(userId, productId);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER (same as History) */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Favorites
          </h1>

          {data.length > 0 && (
            <div className="flex gap-3">
              <input
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white border border-gray-300 px-4 py-2 rounded-2xl text-sm focus:outline-none focus:border-gray-900"
              />

              <select
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-gray-300 px-5 py-2.5 rounded-2xl text-sm focus:outline-none focus:border-gray-900"
              >
                <option value="">Sort</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          )}
        </div>

        {/* EMPTY */}
        {data.length === 0 && (
          <div className="text-center py-24">
            <p className="text-7xl mb-4">❤️</p>
            <p className="text-xl text-gray-600">No favorites yet</p>
            <p className="text-gray-400 mt-2">
              Your favorite items will appear here
            </p>
          </div>
        )}

        {/* LIST (same card as History) */}
        <div className="space-y-5">
          {data.map((item) => (
            <div
              key={item.productId}
              className="bg-white border border-gray-100 rounded-3xl p-5 flex items-center gap-5 hover:border-gray-200 transition-all"
            >
              {/* Image */}
              <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-medium text-lg text-gray-900 leading-tight">
                  {item.name}
                </h3>

                {item.brand && (
                  <p className="text-gray-500 text-sm mt-1">
                    {item.brand}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => handleToggle(item.productId)}
                className="text-3xl transition-all hover:scale-110 px-2"
              >
                ❤️
              </button>
            </div>
          ))}
        </div>

        {/* PAGINATION (same style) */}
        {data.length > 0 && (
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

export default Favorites;