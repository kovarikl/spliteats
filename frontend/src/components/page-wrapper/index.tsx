import "./index.css";

interface Props {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: Props) => {
  return <div className="page-wrapper">{children}</div>;
};

export { PageWrapper };
