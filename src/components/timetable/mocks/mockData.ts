import { TimeTableLocation } from "../TimeTable";
import { TimeTableItem } from "../TimeTableItem";

export const timetableMockLocations: TimeTableLocation[] = [
  {
    id: 1,
    name: "Mainstage",
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
        startDate: "2024-05-26T08:00:00",
        endDate: "2024-05-26T12:00:00",
        name: "Event 20",
      },
    ],
  },
];

export const timetableMockItems: TimeTableItem[] = [
  {
    id: "e1",
    startDate: "2024-05-25T08:00:00",
    endDate: "2024-05-25T12:00:00",
    name: "Main Event",
    locationId: 1,
    data: {
      type: "music",
      location: "Main stage",
      age: 18,
    },
  },
  {
    id: "e2",
    startDate: "2024-05-25T13:00:00",
    endDate: "2024-05-25T16:30:00",
    name: "Event 2",
    locationId: 1,
  },
  {
    id: "e5",
    startDate: "2024-05-31T08:00:00",
    endDate: "2024-05-31T13:00:00",
    name: "Event 5",
    locationId: 1,
  },
  {
    id: "e3",
    startDate: "2024-05-25T07:00:00",
    endDate: "2024-05-25T10:30:00",
    name: "Event 3",
    locationId: 2,
  },
  {
    id: "e4",
    startDate: "2024-05-25T13:00:00",
    endDate: "2024-05-25T22:00:00",
    name: "Event 4",
    locationId: 2,
  },
  {
    id: "e6",
    startDate: "2024-05-25T12:00:00",
    endDate: "2024-05-25T16:00:00",
    name: "Event 4B",
    locationId: 2,
  },
  {
    id: "e8",
    startDate: "2024-05-25T17:00:00",
    endDate: "2024-05-25T23:00:00",
    name: "Event 4C",
    locationId: 2,
  },
  {
    id: "e7",
    startDate: "2024-05-25T07:00:00",
    endDate: "2024-05-25T10:30:00",
    name: "Event 7",
    locationId: 3,
  },
];
