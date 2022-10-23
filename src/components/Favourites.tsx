import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../main";

type Item = {
  ID: number,
  bottomText: string,
  image: string,
  name: string,
  tags: string,
  topText: string,
}

const API = '';

function Favourites() {
  const { uid } = useContext(userContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsCurrentPage, setItemsCurrentPage] = useState<Array<Item>>([])

  useEffect(() => {
    axios.get(API+currentPage).then((res) => setItemsCurrentPage(res.data));
  }, [])

  return (
    <>
    <div>Current user ID: {uid}</div>
      {itemsCurrentPage.map((meme) => <div>{JSON.stringify(meme)}</div>)}
    </>
  );
}

export default Favourites;