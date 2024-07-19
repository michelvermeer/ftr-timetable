import styled from "styled-components";
import { TimeTable, TimeTableLocation } from "./components/timetable/TimeTable";
import { type TimeTableRenderedItem } from "./components/timetable/TimeTableItem";
import {
  timetableMockItems,
  timetableMockLocations,
  timetableMockLocationsB,
} from "./components/timetable/mocks/mockData";

interface EventData {
  type: string;
  category: string;
  isFree: boolean;
}

const AppContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
  flex-direction: column;
  background-color: #000;
  font-family: Tahoma, sans-serif;

  h1 {
    font-size: 1rem;
    padding: 0.75rem;
    color: #999;
    text-align: center;
    margin: 0;
    z-index: 10;
  }

  .vertical-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;

    .vertical-container {
      flex: 1;
    }
  }
`;

function App() {
  const onItemClicked = (item: TimeTableRenderedItem<EventData>) => {
    console.log("Item clicked:", item, `Free: ${item.data?.isFree || false}`);
  };

  const onLocationClicked = (location: TimeTableLocation) => {
    console.log("Location clicked:", location);
  };

  return (
    <AppContainer>
      <div>
        <h1>Horizontal</h1>
        <TimeTable
          dateFormat="do MMMM ''yy"
          items={timetableMockItems}
          locations={timetableMockLocations}
          onItemClick={onItemClicked}
          onLocationClick={onLocationClicked}
          showTimeMarker={false}
          styles={{
            backgroundColor: "linear-gradient(silver, #aaa)",
            dateBackgroundColor: "#000",
            datePickerBackgroundColor: "#000",
            dateTextColor: "#999",
            borderStyle: "solid 2px rgba(255, 255, 255, 0.2)",
            itemBackgroundColor: "lightgray",
            itemTextColor: "black",
            locationBackgroundColor: "lightgray",
            locationTextColor: "black",
          }}
        />
      </div>
      <div className="vertical-wrapper">
        <h1>Vertical</h1>
        <div className="vertical-container">
          <TimeTable
            variant="vertical"
            items={[]}
            locations={timetableMockLocationsB}
            onItemClick={onItemClicked}
            onLocationClick={onLocationClicked}
            startingHour={8}
            styles={{
              dateBackgroundColor:
                "linear-gradient(to right, #15192D, #292e44)",
              backgroundColor: "#292e44",
              datePickerBackgroundColor:
                "linear-gradient(to right, #15192D, #292e44)",
              borderStyle: "solid 2px rgba(255, 255, 255, 0.05)",
            }}
          />
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
