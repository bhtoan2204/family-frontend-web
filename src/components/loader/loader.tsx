interface LoaderProps {
  height?: string;
  width?: string;
}

const Loader = ({ height = "h-16", width = "w-16" }) => {
  return (
    <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
      <div
        className={`${height} ${width} animate-spin rounded-full border-4 border-solid border-primary border-t-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
