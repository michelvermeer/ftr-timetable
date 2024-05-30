import { useMemo } from "react";
import type { TimeTableItem } from "../TimeTableItem";

interface itemsWithIntersectionProps {
  item: TimeTableItem;
  start: number;
  end: number;
  intersections: number;
  offset: number;
  index: number;
  with: number[];
}

export const useItemIntersections = (items: TimeTableItem[]) => {
  const itemsWithIntersection: itemsWithIntersectionProps[] = useMemo(() => {
    const intersectingItems = items.reduce((acc, item, i) => {
      const start = new Date(item.startDate).getTime();
      const end = new Date(item.endDate).getTime();
      const intersections = acc.filter(
        (existingItem) =>
          (start >= existingItem.start && start <= existingItem.end) ||
          (end >= existingItem.start && end <= existingItem.end)
      );
      for (const existingItem of intersections) {
        if (existingItem.intersections === 0) {
          existingItem.intersections += 1;
          continue;
        }
        for (const existingItemintersection of acc.filter((item) =>
          existingItem.with.includes(item.index)
        )) {
          if (
            (start >= existingItemintersection.start &&
              start <= existingItemintersection.end) ||
            (end >= existingItemintersection.start &&
              end <= existingItemintersection.end)
          ) {
            existingItem.intersections += 1;
          }
        }
      }

      return [
        ...acc,
        {
          item,
          start,
          end,
          offset: intersections.length,
          intersections: intersections.length,
          index: i,
          with: intersections.map((item) => item.index),
        },
      ];
    }, [] as itemsWithIntersectionProps[]);

    return intersectingItems;
  }, [items]);

  return itemsWithIntersection;
};
