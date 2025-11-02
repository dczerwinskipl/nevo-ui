import React from "react";
import { Pagination, Typography } from "@nevo/design-system";
import { getMockProducts } from "../services/mockData";
import { ProductsActions } from "../components/ProductsActions";
import { ProductsFilters } from "../components/ProductsFilters";
import { ProductsTable } from "../components/ProductsTable";

export function ProductsList() {
  const data = getMockProducts();

  const handleAdd = () => console.log("Add product");
  const handleExport = () => console.log("Export");
  const handleSettings = () => console.log("Settings");
  const handleFilter = () => console.log("Apply filters");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography type="section-title">Produkty</Typography>
        <ProductsActions
          onAdd={handleAdd}
          onExport={handleExport}
          onSettings={handleSettings}
        />
      </div>

      <ProductsFilters onFilter={handleFilter} />

      <ProductsTable data={data} />

      <Pagination total={128} pageSize={25} />
    </div>
  );
}
