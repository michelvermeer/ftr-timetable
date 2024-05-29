import { TimeTable, TimeTableRenderedItem } from "./timetable";
import {
  timetableMockItems,
  timetableMockLocations,
} from "./timetable/mocks/mockData";

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
    <div className="flex h-full items-stretch bg-slate-600 flex-col">
      <div>
        <h1 className="text-xl text-white text-center p-4">
          Timetable horizontal
        </h1>
        <TimeTable
          items={timetableMockItems}
          locations={timetableMockLocations}
          onItemClick={onItemClicked}
        />
      </div>
      <div className="flex flex-col flex-1">
        <h1 className="text-xl text-white text-center p-4">
          Timetable vertical
        </h1>
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
