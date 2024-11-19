import { Filters } from "../../components/filters";
import { GridList } from "../../components/grid-list";
import { PageHeadline } from "../../components/page-headline";
import { Search } from "../../components/search";

import "./index.css";

const Restaurants = () => {
  return (
    <div className="restaurants">
      <Filters />
      <div className="list-view">
        <Search />
        <PageHeadline title="Restaurants" />
        <GridList />
      </div>
    </div>
  );
};

export { Restaurants };
