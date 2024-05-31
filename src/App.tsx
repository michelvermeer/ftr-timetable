import styled from "styled-components";
import { TimeTable, TimeTableLocation } from "./components/timetable/TimeTable";
import { type TimeTableRenderedItem } from "./components/timetable/TimeTableItem";
import {
  timetableMockItems,
  timetableMockLocations,
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
  background-color: #d1c7b7;

  h1 {
    font-size: 1.125rem;
    line-height: 1.75rem;
    padding: 0.75rem;
    color: #fff;
    text-align: center;
    margin: 0;
  }

  .vertical-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;

    .vertical-container {
      background-color: #d1c7b7;
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
          items={timetableMockItems}
          locations={timetableMockLocations}
          onItemClick={onItemClicked}
          onLocationClick={onLocationClicked}
        />
      </div>
      <div className="vertical-wrapper">
        <h1>Vertical</h1>
        <div className="bg-red-400 flex-1 vertical-container">
          <TimeTable
            variant="vertical"
            items={timetableMockItems}
            locations={timetableMockLocations}
            onItemClick={onItemClicked}
            onLocationClick={onLocationClicked}
          />
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
