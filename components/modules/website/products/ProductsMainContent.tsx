import Loading from "@/components/custom/Loading";
import ProductsContent from "@/components/custom/ProductsContent";
import ProductsTopBar from "@/components/custom/ProductsTopBar";
import usePagination from "@/hooks/usePagination";
import { Product } from "@/types";
import { Pagination } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useTransition } from "react";

export default function ProductsMainContent({
  slug,
  maxPrice,
  minPrice,
  loading,
  setLoading,
  setMinPrice,
  setMaxPrice,
  className,
}: {
  slug?: string;
  minPrice: number;
  maxPrice: number;
  loading: boolean;
  setLoading: (e: boolean) => void;
  setMinPrice: (e: number) => void;
  setMaxPrice: (e: number) => void;
  className: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [perpage, setPerPages] = useState<number>(10);
  const [filter, setFilter] = useState<string>("latest");
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const count = Math.ceil(products.length / perpage);
  const _DATA = usePagination(products, perpage);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  //get products
  useEffect(() => {
    const getProducts = () => {
      startTransition(async () => {
        await axios
          .get(process.env.NEXT_PUBLIC_API_URL + "/api/products", {
            params: {
              filter: filter,
              category: slug,
              minPrice: minPrice,
              maxPrice: maxPrice,
            },
          })
          .then((response) => {
            setProducts(response.data.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    };
    getProducts();
  }, [page, filter, slug, minPrice, maxPrice, setLoading]);

  return (
    <>
      {isPending ? (
        <Loading isLoading={loading} />
      ) : (
        <div className={`${className}`}>
          <div className="flex flex-col gap-4">
            <ProductsTopBar
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              loading={isPending}
              setLoading={setLoading}
              slug={slug}
              perpage={perpage}
              filter={filter}
              setPerPages={setPerPages}
              setFilter={setFilter}
              maxPage={_DATA.maxPage}
              page={_DATA.maxPage}
              products={products}
            />
            <ProductsContent
              loading={isPending}
              products={_DATA.currentData()}
            />

            {/* pagination */}
            <div className="py-10 flex justify-between mt-auto">
              <Pagination
                count={count}
                page={page}
                color="primary"
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
              />

              <div className="flex ms-auto">
                Showing{" "}
                {_DATA.maxPage === page ? products.length : perpage * page} of{" "}
                {products.length} results
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
