import { format, addDays, addHours, startOfDay } from "date-fns";
import { TimeTableLocation } from "../TimeTable";
import { TimeTableItem } from "../TimeTableItem";

const dateToday = format(new Date(), "yyyy-MM-dd");
const dateTomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

export const timetableMockLocations: TimeTableLocation[] = [
  {
    id: 1,
    name: "Mainstage",
    style: {
      backgroundColor: "#777",
      color: "#fff",
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
    info: "Don't miss it!",
    locationId: 1,
    style: {
      backgroundColor: "#116599",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "0.875rem",
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
    cancelled: true,
  },
];

export const timetableMockLocationsB: TimeTableLocation[] = [
  {
    id: 1,
    name: "Red team",
    style: {
      background: "linear-gradient(170deg, #282D43, #853232)",
    },
    items: [
      {
        id: 100,
        name: "Introduction",
        info: "Gather at the office",
        startDate: new Date(addHours(startOfDay(new Date()), 8.5)),
        endDate: new Date(addHours(startOfDay(new Date()), 10)),
      },
      {
        id: 101,
        name: "Hurdles",
        startDate: new Date(addHours(startOfDay(new Date()), 10.25)),
        endDate: new Date(addHours(startOfDay(new Date()), 11.75)),
        style: {
          backgroundColor: "#b3ae57",
          color: "#444",
        },
      },
      {
        id: 110,
        name: "Lunch",
        startDate: new Date(addHours(startOfDay(new Date()), 12)),
        endDate: new Date(addHours(startOfDay(new Date()), 13)),
      },
      {
        id: 102,
        name: "Lacrosse for dummies",
        startDate: new Date(addHours(startOfDay(new Date()), 13.25)),
        endDate: new Date(addHours(startOfDay(new Date()), 14.75)),
        style: {
          backgroundColor: "#9f93a0",
        },
      },
      {
        id: 103,
        name: "Live Stratego",
        info: "In the park. Bring your own gear.",
        startDate: new Date(addHours(startOfDay(new Date()), 15)),
        endDate: new Date(addHours(startOfDay(new Date()), 16.5)),
        style: {
          backgroundColor: "#000",
        },
      },
      {
        id: 111,
        name: "Celebration drinks",
        startDate: new Date(addHours(startOfDay(new Date()), 17)),
        endDate: new Date(addHours(startOfDay(new Date()), 19)),
        style: {
          backgroundColor: "#324b41",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Blue team",
    style: {
      background: "linear-gradient(#282D43, #116599)",
    },
    items: [
      {
        id: 200,
        name: "Introduction",
        info: "Gather at the office",
        startDate: new Date(addHours(startOfDay(new Date()), 8.5)),
        endDate: new Date(addHours(startOfDay(new Date()), 10)),
      },
      {
        id: 202,
        name: "Lacrosse for dummies",
        startDate: new Date(addHours(startOfDay(new Date()), 10.25)),
        endDate: new Date(addHours(startOfDay(new Date()), 11.75)),
        style: {
          backgroundColor: "#9f93a0",
        },
      },
      {
        id: 210,
        name: "Lunch",
        startDate: new Date(addHours(startOfDay(new Date()), 12)),
        endDate: new Date(addHours(startOfDay(new Date()), 13)),
      },
      {
        id: 203,
        name: "Live Stratego",
        info: "In the park. Bring your own gear.",
        startDate: new Date(addHours(startOfDay(new Date()), 13.25)),
        endDate: new Date(addHours(startOfDay(new Date()), 14.75)),
        style: {
          backgroundColor: "#000",
        },
      },
      {
        id: 201,
        name: "Hurdles",
        startDate: new Date(addHours(startOfDay(new Date()), 15)),
        endDate: new Date(addHours(startOfDay(new Date()), 16.5)),
        style: {
          backgroundColor: "#b3ae57",
          color: "#444",
        },
      },
      {
        id: 211,
        name: "Celebration drinks",
        startDate: new Date(addHours(startOfDay(new Date()), 17)),
        endDate: new Date(addHours(startOfDay(new Date()), 19)),
        style: {
          backgroundColor: "#324b41",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Green team",
    style: {
      background: "linear-gradient(-170deg, #282D43, #307430)",
    },
    items: [
      {
        id: 300,
        name: "Introduction",
        info: "Gather at the office",
        startDate: new Date(addHours(startOfDay(new Date()), 8.5)),
        endDate: new Date(addHours(startOfDay(new Date()), 10)),
      },
      {
        id: 303,
        name: "Live Stratego",
        info: "In the park. Bring your own gear.",
        startDate: new Date(addHours(startOfDay(new Date()), 10.25)),
        endDate: new Date(addHours(startOfDay(new Date()), 11.75)),
        style: {
          backgroundColor: "#000",
        },
      },
      {
        id: 310,
        name: "Lunch",
        startDate: new Date(addHours(startOfDay(new Date()), 12)),
        endDate: new Date(addHours(startOfDay(new Date()), 13)),
      },
      {
        id: 301,
        name: "Hurdles",
        startDate: new Date(addHours(startOfDay(new Date()), 13.25)),
        endDate: new Date(addHours(startOfDay(new Date()), 14.75)),
        style: {
          backgroundColor: "#b3ae57",
          color: "#444",
        },
      },
      {
        id: 302,
        name: "Lacrosse for dummies",
        startDate: new Date(addHours(startOfDay(new Date()), 15)),
        endDate: new Date(addHours(startOfDay(new Date()), 16.5)),
        style: {
          backgroundColor: "#9f93a0",
        },
      },

      {
        id: 311,
        name: "Celebration drinks",
        startDate: new Date(addHours(startOfDay(new Date()), 17)),
        endDate: new Date(addHours(startOfDay(new Date()), 19)),
        style: {
          backgroundColor: "#324b41",
        },
      },
    ],
  },
];
