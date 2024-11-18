import { Outlet } from "react-router";
import { AppBar } from "../../components/app-bar";
import { PageWrapper } from "../../components/page-wrapper";

const Home = () => {
  return (
    <div className="home">
      <AppBar />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </div>
  );
};

export { Home };
