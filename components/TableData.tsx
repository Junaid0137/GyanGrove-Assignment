"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Edit } from "./Edit";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function TableData({
  items,
  updateItem,
  deleteItem,
  filterItemsByCategory,
}) {
  return (
    <motion.div
      className="bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b flex flex-col space-y-1.5 justify-between">
        <div className="w-64">
          <Select onValueChange={(value) => filterItemsByCategory(value)}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="Laptop">Laptop</SelectItem>
              <SelectItem value="Appliances">Appliances</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="Clothings">Clothings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="min-w-full bg-white">
        <TableCaption className="text-center font-semibold p-4">
          {items.length === 0
            ? "Inventory is empty, Click Add to add items"
            : "A list of Inventory"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2">Name</TableHead>
            <TableHead className="px-4 py-2">Category</TableHead>
            <TableHead className="px-4 py-2">Quantity</TableHead>
            <TableHead className="px-4 py-2">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <motion.tr
              key={item.name}
              className={`${
                item.quantity < 10 ? "bg-red-100" : "bg-white"
              } border-b border-gray-200`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TableCell className="px-4 py-2">{item.name}</TableCell>
              <TableCell className="px-4 py-2">{item.category}</TableCell>
              <TableCell className="px-4 py-2">{item.quantity}</TableCell>
              <TableCell className="px-4 py-2 flex space-x-2">
                <Edit item={item} updateItem={updateItem} />
                <Button
                  variant="destructive"
                  onClick={() =>
                    toast("Are you sure ?", {
                      description: "Do you really want to delete it !",
                      action: {
                        label: "Delete",
                        onClick: () => deleteItem(item.id),
                      },
                    })
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
