import { render } from "@testing-library/react";
import { TimeTable } from "./TimeTable";
import { timetableMockItems, timetableMockLocations } from "./mocks/mockData";

describe("Timetable Horizontal", () => {
  it("renders the horizontal timetable", () => {
    const mockTimetable = render(
      <TimeTable
        variant="horizontal"
        locations={timetableMockLocations}
        items={timetableMockItems}
      />
    );

    expect(mockTimetable.getByTestId("timetable-horizontal")).toBeDefined();
    expect(mockTimetable.getByText("Main Event")).toBeInTheDocument();
    expect(mockTimetable.getByTitle("Main Event")).toBeInTheDocument();
    expect(mockTimetable.getByTitle("Main Event")).toHaveStyle("width: 240px");
    expect(mockTimetable.getByTestId("timetable-location-1")).toHaveTextContent(
      "Mainstage"
    );
  });
});

describe("Timetable Vertical", () => {
  it("renders the vertical timetable", () => {
    const mockTimetable = render(
      <TimeTable
        variant="vertical"
        locations={timetableMockLocations}
        items={timetableMockItems}
      />
    );

    expect(mockTimetable.getByTestId("timetable-vertical")).toBeDefined();
    expect(mockTimetable.getByText("Main Event")).toBeInTheDocument();
    expect(mockTimetable.getByTitle("Main Event")).toBeInTheDocument();
    expect(mockTimetable.getByTitle("Main Event")).toHaveStyle("height: 240px");
    expect(mockTimetable.getByTestId("timetable-location-1")).toHaveTextContent(
      "Mainstage"
    );
  });
});
