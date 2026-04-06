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

    useEffect(() => {
        console.log("userId on mount:", userId); // 👈 add this
    }, [userId]);

    const fetchData = async () => {
        if (!userId) return;

        const res = await getFavorites(page, sort, search, userId);

        console.log("FULL RESPONSE 👉", res.data);   // 👈 ADD THIS
        console.log("FIRST ITEM 👉", res.data.favorites[0]); // 👈 ADD

        setData(res.data.favorites);
        setPages(res.data.pages);
    };

    useEffect(() => {
        if (!userId) return;   // 🚨 STOP if no user

        fetchData();
    }, [page, sort, search, userId]);

    const handleToggle = async (productId : string) => {
        if (!userId) return;

        await toggleFavorite(userId, productId );
        fetchData();
    };

    return (
        <div className="p-6">

            {data.length > 0 && (
                <>
                    <input
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 mb-3"
                    />

                    <select onChange={(e) => setSort(e.target.value)}>
                        <option value="">Sort</option>
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                    </select>
                </>
            )}

            {data.length === 0 && <p>No favorites yet ❤️</p>}

            <div className="grid gap-4">
                {data.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4 bg-white shadow rounded-lg p-4">
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
                        <button 
                            onClick={() => handleToggle(item.productId)}
                            className="text-2xl transition text-red-500 hover:text-red-600"
                        >
                            ❤️
                        </button>
                    </div>
                ))}
            </div>

            {data.length > 0 && (
                <div>
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                    <span>{page}/{pages}</span>
                    <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
                </div>
            )}
        </div>
    );
};

export default Favorites;