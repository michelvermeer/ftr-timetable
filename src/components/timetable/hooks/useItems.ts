import { useMemo } from "react";
import type { TimeTableItem } from "../TimeTableItem";
import type { TimeTableLocation } from "../TimeTable";

export const useItems = (
  locations: TimeTableLocation[],
  individualItems?: TimeTableItem[]
) => {
  const mergedItems: TimeTableItem[] = useMemo(() => {
    let items: TimeTableItem[] = [];
    for (const location of locations) {
      if (!location.items?.length) {
        continue;
      }
      for (const item of location.items.filter((item) => {
        const startDate = new Date(item.startDate);
        const endDate = new Date(item.endDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error("Invalid startDate or endDate format", item);
          return false;
        }
        return true;
      })) {
        items.push({
          ...item,
          locationId: location.id,
        });
      }
    }

    if (individualItems?.length) {
      items = items.concat(
        individualItems.filter((item) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error("Invalid startDate or endDate format", item);
            return false;
          }
          return true;
        })
      );
    }

    return items;
  }, [individualItems, locations]);

  return mergedItems;
};
