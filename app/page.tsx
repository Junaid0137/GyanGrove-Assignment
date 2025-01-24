"use client";
import { Add } from "@/components/Add";
import { TableData } from "@/components/TableData";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [items, setItems] = useState([]);

  const [filterCategory, setFilterCategory] = useState("");

  const addItem = (item) => {
    setItems([...items, { ...item, id: items.length + 1 }]);
  };

  const updateItem = (updatedItem) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const deleteItem = (id) => {
    console.log("Deleting item with id:", id);
    setItems(items.filter((item) => item.id !== id));
  };

  const sortItemsByQuantity = () => {
    const sortedItems = [...items].sort((a, b) => a.quantity - b.quantity);
    setItems(sortedItems);
  };

  const filterItemsByCategory = (category) => {
    if (category === "all") {
      setFilterCategory("");
    } else {
      setFilterCategory(category);
    }
  };

  const filteredItems = filterCategory
    ? items.filter((item) => item.category === filterCategory)
    : items;

  return (
    <motion.div
      className="min-h-screen  bg-white p-8 m-10 rounded-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.header
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] mb-8"
      >
        <div className="container mx-auto px-14 py-6">
          <h1 className="text-4xl font-extrabold mx-auto text-center text-slate-900">
            <span className="text-black">Inventory</span>
            <span className="text-[#22C55E] shadow-[#22C55E]"> Management</span>
          </h1>
        </div>
      </motion.header>
      <main className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Add addItem={addItem} />
          <Button
            onClick={sortItemsByQuantity}
            className="bg-[#22C55E] text-white transition-all font-extrabold shadow-2xl shadow-[#22C55E]"
          >
            Sort
          </Button>
        </div>
        <div>
          <TableData
            items={filteredItems}
            updateItem={updateItem}
            deleteItem={deleteItem}
            filterItemsByCategory={filterItemsByCategory}
          />
        </div>
      </main>
    </motion.div>
  );
}
