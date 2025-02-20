import React from "react";

interface ICategoryProps {
  category: TCategory;
  size?: string;
}

export const Category: React.FC<ICategoryProps> = ({ category, size }) => {
  return (
    <p
      className={`text-white ${size ? size : "text-sm"} p-2 rounded-md w-max ${
        category?.name === "Starter"
          ? "bg-green-700"
          : category?.name === "Dessert"
            ? "bg-pink-700"
            : "bg-blue-700"
      }`}
    >
      {category?.name}
    </p>
  );
};
