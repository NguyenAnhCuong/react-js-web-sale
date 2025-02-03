import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/book/ViewDetail";

const BookPage = () => {
  let location = useLocation();

  let params = new URLSearchParams(location.search);

  const id = params?.get("id");

  return (
    <>
      <ViewDetail />
    </>
  );
};

export default BookPage;
