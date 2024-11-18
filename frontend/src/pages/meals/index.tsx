import { Filters } from "../../components/filters";
import { GridList } from "../../components/grid-list";
import { RestaurantDetail } from "../../components/restaurant-detail";
import { Search } from "../../components/search";
import "./index.css";

// TODO: change layout - first - restaurant with info - full width of page wrapper
// TODO: second - left - filter? (or just top with search)
// then full width list of meals (or with filters)
const Meals = () => {
  return (
    <div className="meals">
      <RestaurantDetail />
      <div className="meals-list">
        <Filters />
        <div className="list-view">
          <Search />
          <GridList />
        </div>
      </div>
    </div>
  );
};

export { Meals };
