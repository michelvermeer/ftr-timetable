# React Timetable

A versatile, configurable and responsive timetable component for React.
Ideal for showing the agenda for locations on a specific date.

## Installation

```
npm i ftr-timetable
```

### Include CSS

Import in your CSS

```css
@import url("/node_modules/ftr-timetable/dist/style.css");
```

Import in your module

```ts
import "ftr-timetable/dist/style.css";
```

## Usage example

```ts
import { TimeTable, TimeTableItem, TimeTableLocation } from "ftr-timetable";

interface EventData {
  type?: string;
  category?: string;
  isFree: boolean;
}

const locations: TimeTableLocation[] = [
  {
    id: "1",
    name: "Mainstage",
    items: [
      {
        id: "4",
        name: "Event included in location",
        startDate: "2024-05-05T16:00:00+02:00",
        endDate: "2024-05-05T18:00:00+02:00",
        data: {
          isFree: true,
        },
      },
    ],
  },
  {
    id: "2",
    name: "Garden",
  },
];

const items: TimeTableItem[] = [
  {
    id: "1",
    name: "Main event",
    locationId: "1",
    startDate: "2024-05-05T10:00:00+02:00",
    endDate: "2024-05-05T15:00:00+02:00",
  },
  {
    id: "2",
    name: "Violin concert",
    locationId: "2",
    startDate: "2024-05-05T08:00:00+02:00",
    endDate: "2024-05-05T12:00:00+02:00",
    data: {
      type: "Music",
      category: "Classical",
      isFree: true,
    },
  },
  {
    id: "3",
    name: "Day 2 Main event",
    locationId: "1",
    startDate: "2024-05-06T10:00:00+02:00",
    endDate: "2024-05-06T15:00:00+02:00",
  },
];

const onItemClicked = (item: TimeTableRenderedItem<EventData>) => {
  console.log("Item clicked: ", item, `Free: ${item.data?.isFree || false}`);
};

return (
  <TimeTable
    items={items}
    variant="horizontal"
    locations={locations}
    onItemClick={onItemClicked}
  />
);
```

## API Reference

### TimeTable

Options

| Option        | Type                                                            | Required | Default    | Description                                                                                                                               |
| ------------- | --------------------------------------------------------------- | -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| locations     | [TimeTableLocation[]](#timetablelocation)                       | yes      |            | The locations to show in the timetable                                                                                                    |
| items         | [TimeTableItem[]](#timetableitem)                               | no       | []         | The events to show in the timetable                                                                                                       |
| variant       | _string_                                                        | no       | horizontal | The display style of the timetable. Can be `horizontal` or `vertical`. Defaults to vertical when unspecified and there is only 1 location |
| dates         | _string[]_                                                      | no       |            | Predefined dates to choose from. The first date will be selected by default. The format needs to be `yyyy-MM-dd`                          |
| startingHour  | _number_                                                        | no       | 6          | Starting hour of a day                                                                                                                    |
| numberOfHours | _number_                                                        | no       | 24         | Number of hours to display for a single day                                                                                               |
| onDateChange  | _function(date: string)_                                        | no       |            | Callback function when the date is changed. Returns the selected date as `yyyy-MM-dd`                                                     |
| onItemClick   | _function(item: `TimeTableRenderedItem<T>`) => void_            | no       |            | Callback function when an item is clicked                                                                                                 |
| renderItem    | _function(item: `TimeTableRenderedItem<T>`) => React.ReactNode_ | no       |            | Custom rendering of items                                                                                                                 |

### TimeTableLocation

Options

| Option | Type                | Required | Default | Description                  |
| ------ | ------------------- | -------- | ------- | ---------------------------- |
| id     | _string_ / _number_ | yes      |         | Location ID                  |
| name   | _string_            | yes      |         | Location name                |
| items  | `TimeTableItem[]`   | no       |         | Event items for the location |

### TimeTableItem

Options

| Option    | Type                | Required | Default | Description                               |
| --------- | ------------------- | -------- | ------- | ----------------------------------------- |
| id        | _string_ / _number_ | yes      |         | Item ID                                   |
| name      | _string_            | yes      |         | Item name                                 |
| startDate | _Date_ / _string_   | yes      |         | Item start date                           |
| endDate   | _Date_ / _string_   | yes      |         | Item end date                             |
| data      | _{}_                | no       |         | Optional extra data. Useful for callbacks |
