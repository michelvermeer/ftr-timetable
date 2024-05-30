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
      for (const item of location.items) {
        items.push({
          ...item,
          locationId: location.id,
        });
      }
    }

    if (individualItems?.length) {
      items = items.concat(individualItems);
    }

    return items;
  }, [individualItems, locations]);

  return mergedItems;
};
