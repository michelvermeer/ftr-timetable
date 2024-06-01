import styled from "styled-components";
import { TimeTable, TimeTableLocation } from "./components/timetable/TimeTable";
import { type TimeTableRenderedItem } from "./components/timetable/TimeTableItem";
import {
  timetableMockItems,
  timetableMockLocations,
} from "./components/timetable/mocks/mockData";
import React from "react";

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
  background-color: #f3f4f6;

  h1 {
    font-size: 1rem;
    padding: 0.75rem;
    color: #666;
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

const CustomLocation = styled.div`
  background-color: #550000;
  height: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 1.25rem;
  line-height: 1;
  letter-spacing: 1px;
  font-weight: 600;
  font-family: Brush Script MT, serif;
  gap: 10px;

  .custom-location-name {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const CustomItem = styled.div`
  background-color: #550000;
  height: 100%;
  color: #fff;
  position: relative;
  padding: 10px;

  h4 {
    margin: 0;
    font-family: Tahoma, sans-serif;
    font-size: 14px;
  }
`;

const renderLocation: React.FC<TimeTableLocation> = (location) => {
  return (
    <CustomLocation>
      <div>♦</div>
      <div className="custom-location-name">{location.name}</div>
    </CustomLocation>
  );
};

const renderItem: React.FC<TimeTableRenderedItem<EventData>> = (item) => {
  return (
    <CustomItem>
      <h4>{item.name}</h4>
      <div>{item.data?.type}</div>
    </CustomItem>
  );
};

function App() {
  const onItemClicked = (item: TimeTableRenderedItem<EventData>) => {
    console.log("Item clicked:", item, `Free: ${item.data?.isFree || false}`);
  };

  const onLocationClicked = (location: TimeTableLocation) => {
    console.log("Location clicked:", location);
  };

  // const styles = {
  //   item: {
  //     backgroundColor: "#374151",
  //     color: "#fff",
  //   },
  // }

  return (
    <AppContainer>
      <div>
        <h1>Horizontal</h1>
        <TimeTable
          items={timetableMockItems}
          locations={timetableMockLocations}
          onItemClick={onItemClicked}
          onLocationClick={onLocationClicked}
          styles={{
            backgroundColor: "transparent",
            dateBackgroundColor: "ivory",
            locationBackgroundColor: "beige",
            textColor: "#000",
            borderStyle: "solid 1px #ccc",
            itemBackgroundColor: "burlywood",
            itemHoverBackgroundColor: "darkkhaki",
            itemTextColor: "#fff",
          }}
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
            renderLocation={renderLocation}
            renderItem={renderItem}
            styles={{
              backgroundColor: "#220000",
              dateBackgroundColor: "#440000",
              textColor: "#fff",
              borderStyle: "solid 4px #330000",
              itemBackgroundColor: "#660000",
              itemHoverBackgroundColor: "#880000",
              itemTextColor: "#aaa",
            }}
          />
        </div>
      </div>
    </AppContainer>
  );
}

export default App;
