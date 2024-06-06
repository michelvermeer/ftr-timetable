import { format, addDays } from "date-fns";
import { TimeTableLocation } from "../TimeTable";
import { TimeTableItem } from "../TimeTableItem";

const dateToday = format(new Date(), "yyyy-MM-dd");
const dateTomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

export const timetableMockLocations: TimeTableLocation[] = [
  {
    id: 1,
    name: "Mainstage",
    style: {
      backgroundColor: "#444",
    },
  },
  {
    id: 2,
    name: "Playground",
  },
  {
    id: 3,
    name: "Stage with a very long name, so long that it could break the layout",
    items: [
      {
        id: "e20",
        startDate: `${dateTomorrow}T08:00:00`,
        endDate: `${dateTomorrow}T12:00:00`,
        name: "Event 20",
      },
    ],
  },
];

export const timetableMockItems: TimeTableItem[] = [
  {
    id: "e1",
    startDate: `${dateToday}T08:00:00`,
    endDate: `${dateToday}T12:00:00`,
    name: "Main Event",
    locationId: 1,
    style: {
      backgroundColor: "#816c6c",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "inset 0 5px 5px rgba(0, 0, 0, 0.4)",
    },
    data: {
      type: "Music",
      category: "Music",
      isFree: true,
    },
  },
  {
    id: "e2",
    startDate: `${dateToday}T12:00:00`,
    endDate: `${dateToday}T16:30:00`,
    name: "Event 2",
    locationId: 1,
    className: "special-event",
    data: {
      type: "Music",
      category: "Music",
      isFree: true,
    },
  },
  {
    id: "e5",
    startDate: `${dateTomorrow}T08:00:00`,
    endDate: `${dateTomorrow}T13:00:00`,
    name: "Event 5",
    locationId: 1,
  },
  {
    id: "e3",
    startDate: `${dateToday}T07:00:00`,
    endDate: `${dateToday}T10:30:00`,
    name: "Event 3",
    locationId: 2,
  },
  {
    id: "e4",
    startDate: `${dateToday}T13:00:00`,
    endDate: `${dateToday}T22:00:00`,
    name: "Event 4",
    locationId: 2,
  },
  {
    id: "e6",
    startDate: `${dateToday}T12:00:00`,
    endDate: `${dateToday}T16:00:00`,
    name: "Event 4B",
    locationId: 2,
  },
  {
    id: "e8",
    startDate: `${dateToday}T17:00:00`,
    endDate: `${dateToday}T23:00:00`,
    name: "Event 4C",
    locationId: 2,
  },
  {
    id: "e7",
    startDate: `${dateToday}T07:00:00`,
    endDate: `${dateToday}T10:30:00`,
    name: "Event 7",
    locationId: 3,
  },
  {
    id: "e7b",
    startDate: `${dateToday}T07:00:00`,
    endDate: `${dateToday}T10:30:00`,
    name: "Event 7B",
    locationId: 3,
  },
];
