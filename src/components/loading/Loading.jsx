import { MoonLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <MoonLoader color="blue" />
    </div>
  );
};

export default LoadingPage;
