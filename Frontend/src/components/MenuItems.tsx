import { useState } from "react";
import type { IMenuItem } from "../types";
import { BsCart, BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { VscLoading } from "react-icons/vsc";
import axios from "axios";
import { restaurantService } from "../main";
import toast from "react-hot-toast";

interface MenuItemsProps {
  items: IMenuItem[];
  onItemDeleted: () => void;
  isSeller: boolean;
}

const MenuItems = ({ items, onItemDeleted, isSeller }: MenuItemsProps) => {
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const handleDelete = async (itemId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this item");
    if (!confirm) return;

    try {
      setLoadingItemId(itemId);
      await axios.delete(`${restaurantService}/api/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Item deleted");
      onItemDeleted();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete item");
    } finally {
      setLoadingItemId(null);
    }
  };

  const toggleAvailiblity = async (itemId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to update this item status",
    );
    if (!confirm) return;

    try {
      setLoadingItemId(itemId);
      const { data } = await axios.put(
        `${restaurantService}/api/items/status/${itemId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success(data.message);
      onItemDeleted();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    } finally {
      setLoadingItemId(null);
    }
  };
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => {
        const isLoading = loadingItemId === item._id;
        return (
          <div
            key={item._id}
            className={`relative flex gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md ${
              !item.isAvailable ? "opacity-70" : ""
            } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
          >
            <div className="relative shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className={`h-20 w-20 rounded-lg object-cover ${
                  !item.isAvailable ? "grayscale brightness-75" : ""
                }`}
              />
              {!item.isAvailable && (
                <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 text-[10px] font-semibold text-white text-center px-1">
                  Not available
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div>
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="font-medium text-gray-900">₨{item.price}</p>

                {isSeller && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleAvailiblity(item._id)}
                      disabled={isLoading}
                      className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed"
                      title={
                        item.isAvailable ? "Mark unavailable" : "Mark available"
                      }
                    >
                      {item.isAvailable ? (
                        <BsEye size={18} />
                      ) : (
                        <FiEyeOff size={18} />
                      )}
                    </button>

                    <button
                      disabled={isLoading}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed"
                      title="Delete item"
                    >
                      <BiTrash
                        size={18}
                        onClick={() => handleDelete(item._id)}
                      />
                    </button>
                  </div>
                )}
                {!isSeller && (
                  <button
                    disabled={!item.isAvailable || isLoading}
                    onClick={() => {}}
                    className={`flex items-center justify-center rounded-lg p-2  ${!item.isAvailable || isLoading ? "cursor-not-allowed text-gray-400" : "text-red-500 hover:bg-red-50"}`}
                  >
                    {isLoading ? (
                      <VscLoading size={18} className="animate-spin" />
                    ) : (
                      <BsCart size={18} />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItems;
