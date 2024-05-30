import { TimeTable, TimeTableRenderedItem } from "./components/timetable";
import {
  timetableMockItems,
  timetableMockLocations,
} from "./components/timetable/mocks/mockData";

interface EventData {
  type: string;
  category: string;
  isFree: boolean;
}

function App() {
  const onItemClicked = (item: TimeTableRenderedItem<EventData>) => {
    console.log("Item clicked: ", item, `Free: ${item.data?.isFree || false}`);
  };

  return (
    <div className="flex h-full items-stretch bg-stone-600 flex-col">
      <div>
        <h1 className="text-lg text-white text-center p-3">Horizontal</h1>
        <TimeTable
          items={timetableMockItems}
          locations={timetableMockLocations}
          onItemClick={onItemClicked}
        />
      </div>
      <div className="flex flex-col flex-1">
        <h1 className="text-lg text-white text-center p-3">Vertical</h1>
        <div className="bg-red-400 flex-1">
          <TimeTable
            variant="vertical"
            items={timetableMockItems}
            locations={timetableMockLocations}
            onItemClick={onItemClicked}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
