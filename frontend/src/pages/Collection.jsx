/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [viewMode, setViewMode] = useState("grid");

  // Calculate max price from products
  useEffect(() => {
    if (products.length > 0) {
      const max = Math.max(...products.map((p) => p.price));
      setMaxPrice(max);
      setPriceRange([0, max]);
    }
  }, [products]);

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let filtered = [...products];

    // 1. Search filter
    if (showSearch && search) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 2. Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => matchesCategory(p.category));
    }

    // 3. Collection filter
    if (selectedCollection) {
      filtered = filtered.filter((p) => p.brand === selectedCollection);
    }

    // 4. Subcategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((p) =>
        subCategory.some((sc) => p.subCategory?.includes(sc))
      );
    }

    // 5. Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    setFilterProducts(filtered);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      case "name":
        setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  const clearFilters = () => {
    setSubCategory([]);
    setPriceRange([0, maxPrice]);
    setSortType("relevant");
  };

  const activeFiltersCount =
    subCategory.length +
    (priceRange[0] !== 0 || priceRange[1] !== maxPrice ? 1 : 0);

  useEffect(() => {
    applyFilter();
  }, [
    selectedCategory,
    selectedCollection,
    subCategory,
    search,
    showSearch,
    products,
    priceRange,
  ]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const matchesCategory = (productCategory) => {
    if (!productCategory) return false;

    // Handle both array and string category formats
    if (Array.isArray(productCategory)) {
      return productCategory.includes(selectedCategory);
    } else {
      return productCategory === selectedCategory;
    }
  };

  const getCollectionsForCategory = () => {
    if (!selectedCategory || products.length === 0) return [];

    console.log(
      "All products:",
      products.map((p) => ({
        name: p.name,
        category: p.category,
        brand: p.brand,
      }))
    );

    // Filter products matching the selected category
    const filteredProducts = products.filter((p) => {
      const matches = matchesCategory(p.category);
      if (matches) {
        console.log(
          `✓ Matched: ${p.name}, category: ${JSON.stringify(
            p.category
          )}, brand: ${p.brand}`
        );
      }
      return matches;
    });

    // Map brands and remove duplicates
    const collections = [
      ...new Set(
        filteredProducts.map((p) => p.brand).filter(Boolean) // remove null/undefined
      ),
    ];

    console.log(`Collections for ${selectedCategory} :`, collections);
    console.log(`Total filtered products: ${filteredProducts.length}`);
    return collections;
  };

  if (!selectedCategory) {
    return (
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-black px-4 py-20 text-white">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 font-bold text-3xl md:text-6xl tracking-tight">
              ABASI BLESSED COLLECTION
            </h1>
            <div className="bg-blue-400 mx-auto mb-6 w-24 h-1"></div>
            <p className="mx-auto max-w-2xl text-gray-300 text-sm md:text-lg">
              Choose your category and discover premium fashion crafted for
              excellence
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            {/* Men's Collection */}
            <div
              onClick={() => setSelectedCategory("Men")}
              className="group relative shadow-lg hover:shadow-2xl border-2 border-black hover:border-blue-400 rounded-2xl h-[500px] overflow-hidden transition-all duration-300 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dvd7wbty8/image/upload/v1765669186/BRAND-SHOOT-335_wvrwjg.jpg')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black group-hover:from-blue-400/90 via-black/70 group-hover:via-black/60 to-black/30 transition-all duration-300"></div>

              <div className="z-10 relative flex flex-col justify-end p-8 h-full">
                <div className="flex justify-center items-center bg-white/10 group-hover:bg-blue-400 backdrop-blur-sm mb-6 rounded-full w-16 h-16 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h2 className="mb-3 font-bold text-white text-2xl md:text-3xl">
                  SHOP FOR MEN
                </h2>
                <p className="mb-6 text-gray-200">
                  Discover our exclusive collection of men's fashion essentials
                </p>
                <div className="flex items-center gap-2 group-hover:gap-4 font-semibold text-white transition-all">
                  <span>Explore Collection</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Women's Collection */}
            <div
              onClick={() => setSelectedCategory("Women")}
              className="group relative shadow-lg hover:shadow-2xl border-2 border-black hover:border-blue-400 rounded-2xl h-[500px] overflow-hidden transition-all duration-300 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dvd7wbty8/image/upload/v1765669432/LEG_0935_utpldv.jpg')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black group-hover:from-blue-400/90 via-black/70 group-hover:via-black/60 to-black/30 transition-all duration-300"></div>

              <div className="z-10 relative flex flex-col justify-end p-8 h-full">
                <div className="flex justify-center items-center bg-white/10 group-hover:bg-blue-400 backdrop-blur-sm mb-6 rounded-full w-16 h-16 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h2 className="mb-3 font-bold text-white text-2xl md:text-3xl">
                  SHOP FOR WOMEN
                </h2>
                <p className="mb-6 text-gray-200">
                  Explore elegant and sophisticated women's fashion pieces
                </p>
                <div className="flex items-center gap-2 group-hover:gap-4 font-semibold text-white transition-all">
                  <span>Explore Collection</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Unisex Collection */}
            <div
              onClick={() => setSelectedCategory("Unisex")}
              className="group relative shadow-lg hover:shadow-2xl border-2 border-black hover:border-blue-400 rounded-2xl h-[500px] overflow-hidden transition-all duration-300 cursor-pointer"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{
                  backgroundImage:
                    "url('https://res.cloudinary.com/dvd7wbty8/image/upload/v1765669288/BRAND_SHOOT-205_1_dc3bqc.jpg')",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black group-hover:from-blue-400/90 via-black/70 group-hover:via-black/60 to-black/30 transition-all duration-300"></div>

              <div className="z-10 relative flex flex-col justify-end p-8 h-full">
                <div className="flex justify-center items-center bg-white/10 group-hover:bg-blue-400 backdrop-blur-sm mb-6 rounded-full w-16 h-16 transition-all duration-300">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="mb-3 font-bold text-white text-2xl md:text-3xl">
                  SHOP UNISEX
                </h2>
                <p className="mb-6 text-gray-200">
                  Versatile styles designed for everyone to enjoy
                </p>
                <div className="flex items-center gap-2 group-hover:gap-4 font-semibold text-white transition-all">
                  <span>Explore Collection</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Collection selection page
  if (selectedCategory && !selectedCollection) {
    const collections = getCollectionsForCategory();

    return (
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="bg-black px-4 py-12 text-white">
          <div className="mx-auto max-w-7xl">
            <button
              onClick={() => {
                setSelectedCategory(null);
                clearFilters();
              }}
              className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back to Categories</span>
            </button>
            <div className="text-center">
              <h1 className="mb-3 font-bold text-2xl md:text-5xl">
                {selectedCategory === "Unisex"
                  ? "UNISEX COLLECTIONS"
                  : `${selectedCategory.toUpperCase()}'S COLLECTIONS`}
              </h1>
              <div className="bg-blue-400 mx-auto mb-4 w-24 h-1"></div>
              <p className="mx-auto max-w-2xl text-gray-300">
                Choose a collection to explore
              </p>
            </div>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
          {collections.length === 0 ? (
            <div className="bg-white shadow-md p-12 rounded-lg text-center">
              <div className="mx-auto max-w-md">
                <svg
                  className="mx-auto mb-4 w-20 h-20 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 className="mb-2 font-semibold text-xl">
                  No collections available
                </h3>
                <p className="mb-4 text-gray-600">
                  There are no collections for this category yet.
                </p>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="bg-blue-400 hover:bg-blue-500 px-6 py-2 rounded-lg text-white transition-colors"
                >
                  Back to Categories
                </button>
              </div>
            </div>
          ) : (
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection, index) => {
                // Get a sample product from this collection for the image
                const sampleProduct = products.find(
                  (p) => p.brand === collection
                );

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedCollection(collection)}
                    className="group relative shadow-lg hover:shadow-2xl border-2 border-gray-200 hover:border-blue-400 rounded-2xl h-[400px] overflow-hidden transition-all duration-300 cursor-pointer"
                  >
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{
                        backgroundImage: sampleProduct?.image?.[0]
                          ? `url(${sampleProduct.image[0]})`
                          : "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80')",
                      }}
                    ></div>
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black group-hover:from-blue-400/90 via-black/60 group-hover:via-black/50 to-black/20 transition-all duration-300"></div>

                    {/* Content */}
                    <div className="z-10 relative flex flex-col justify-end p-6 h-full">
                      <h2 className="mb-2 font-bold text-white text-2xl">
                        {collection}
                      </h2>
                      <p className="mb-4 text-gray-200 text-sm">
                        {products.filter((p) => p.brand === collection).length}{" "}
                        items
                      </p>
                      <div className="flex items-center gap-2 group-hover:gap-4 font-semibold text-white transition-all">
                        <span>View Collection</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Products page (when collection is selected)
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-black px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => {
              setSelectedCollection(null);
              clearFilters();
            }}
            className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back to Collections</span>
          </button>
          <div className="text-center">
            <h1 className="mb-3 font-bold text-2xl md:text-5xl">
              {selectedCollection}
            </h1>
            <div className="bg-blue-400 mx-auto mb-4 w-24 h-1"></div>
            <p className="mx-auto max-w-2xl text-gray-300">
              {selectedCategory === "Men" && "Premium men's fashion"}
              {selectedCategory === "Women" && "Elegant women's fashion"}
              {selectedCategory === "Unisex" && "Versatile styles for everyone"}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="flex lg:flex-row flex-col gap-8">
          {/* Sidebar Filters */}
          <div className="flex-shrink-0 lg:w-64">
            <div className="top-4 sticky bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <h2 className="font-bold text-xl">FILTERS</h2>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-400 px-2 py-1 rounded-full font-bold text-white text-xs">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="lg:hidden"
                >
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      showFilter ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="bg-red-50 hover:bg-red-100 mb-4 px-4 py-2 rounded-lg w-full font-medium text-red-600 text-sm transition-colors"
                >
                  Clear All Filters
                </button>
              )}

              <div
                className={`space-y-6 ${showFilter ? "" : "hidden"} lg:block`}
              >
                {/* Type Filter */}
                <div className="pb-6 border-b">
                  <h3 className="mb-4 font-semibold text-sm uppercase tracking-wide">
                    Type
                  </h3>
                  <div className="space-y-3">
                    {["Topwear", "Bottomwear"].map((type) => (
                      <label
                        key={type}
                        className="group flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={type}
                          checked={subCategory.includes(type)}
                          onChange={toggleSubCategory}
                          className="border-gray-300 rounded focus:ring-blue-400 w-4 h-4 text-blue-400"
                        />
                        <span className="text-gray-700 group-hover:text-blue-400 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="pb-6">
                  <h3 className="mb-4 font-semibold text-sm uppercase tracking-wide">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full text-sm"
                        placeholder="Min"
                      />
                      <span className="text-gray-400">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full text-sm"
                        placeholder="Max"
                      />
                    </div>
                    <div className="text-gray-500 text-xs text-center">
                      ₦{priceRange[0]} - ₦{priceRange[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="bg-white shadow-md mb-6 p-4 rounded-lg">
              <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 text-sm">
                    Showing{" "}
                    <span className="font-semibold text-black">
                      {filterProducts.length}
                    </span>{" "}
                    products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "grid"
                          ? "bg-white shadow-sm"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded transition-colors ${
                        viewMode === "list"
                          ? "bg-white shadow-sm"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    onChange={(e) => setSortType(e.target.value)}
                    value={sortType}
                    className="bg-white px-4 py-2 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 text-sm"
                  >
                    <option value="relevant">Sort by: Relevant</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filterProducts.length === 0 ? (
              <div className="bg-white shadow-md p-12 rounded-lg text-center">
                <div className="mx-auto max-w-md">
                  <svg
                    className="mx-auto mb-4 w-20 h-20 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mb-2 font-semibold text-xl">
                    No products found
                  </h3>
                  <p className="mb-4 text-gray-600">
                    We couldn't find any products matching your filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-blue-400 hover:bg-blue-500 px-6 py-2 rounded-lg text-white transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filterProducts.map((item, index) => (
                  <div
                    key={index}
                    className={
                      viewMode === "grid"
                        ? "group relative bg-white shadow-sm hover:shadow-xl rounded-lg overflow-hidden transition-all hover:-translate-y-1 duration-300"
                        : "group bg-white shadow-sm hover:shadow-xl rounded-lg overflow-hidden transition-all duration-300 flex flex-row"
                    }
                  >
                    <ProductItem
                      name={item.name}
                      id={item._id}
                      price={item.price}
                      image={item.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Collection;
