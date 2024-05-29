import { TimeTable } from "./timetable";
import {
  timetableMockItems,
  timetableMockLocations,
} from "./timetable/mocks/mockData";

function App() {
  return (
    <div className="flex h-full items-stretch bg-slate-200 flex-col">
      <div className="h-[200px] relative">
        <TimeTable
          items={timetableMockItems}
          locations={timetableMockLocations}
        />
      </div>
    </div>
  );
}

export default App;
