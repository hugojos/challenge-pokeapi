interface Props {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children, className }: Props) => {
  return (
    <div className={`w-full lg:w-8/12 mx-auto p-3 ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
