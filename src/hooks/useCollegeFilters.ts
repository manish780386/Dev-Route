import { useMemo } from "react";
import type { FilterState } from "../components/colleges/CollegeFilters";
import type { MPInstitute } from "../components/colleges/MPCollegeCard";

export function useCollegeFilters(
  institutes: MPInstitute[],
  filters: FilterState
): MPInstitute[] {
  return useMemo(() => {
    let list = [...institutes];

    // Search query
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      list = list.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.shortName.toLowerCase().includes(q) ||
          i.city.toLowerCase().includes(q) ||
          i.district.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q)) ||
          i.courses.some((c) => c.name.toLowerCase().includes(q)) ||
          i.affiliation.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (filters.type !== "all") {
      list = list.filter((i) => i.type === filters.type);
    }

    // Tier filter
    if (filters.tier !== "all") {
      list = list.filter((i) => i.tier === filters.tier);
    }

    // City filter
    if (filters.city !== "All Cities") {
      list = list.filter((i) => i.city === filters.city);
    }

    // District filter
    if (filters.district !== "All Districts") {
      list = list.filter((i) => i.district === filters.district);
    }

    // Fees range
    if (filters.feesMax < 9999999) {
      list = list.filter(
        (i) =>
          i.feesPerYear >= filters.feesMin &&
          i.feesPerYear <= filters.feesMax
      );
    }

    // Hostel
    if (filters.hostel !== null) {
      list = list.filter((i) => i.hostelAvailable === filters.hostel);
    }

    // Min rating
    if (filters.minRating > 0) {
      list = list.filter((i) => i.rating >= filters.minRating);
    }

    // Sort
    list.sort((a, b) => {
      switch (filters.sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "fees-asc":
          return a.feesPerYear - b.feesPerYear;
        case "fees-desc":
          return b.feesPerYear - a.feesPerYear;
        case "package": {
          const getPkg = (s: string) =>
            parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
          return getPkg(b.avgPackage) - getPkg(a.avgPackage);
        }
        case "nirf": {
          const an = a.ranking.nirf ?? 9999;
          const bn = b.ranking.nirf ?? 9999;
          return an - bn;
        }
        case "established":
          return a.established - b.established;
        default:
          return b.rating - a.rating;
      }
    });

    return list;
  }, [institutes, filters]);
}