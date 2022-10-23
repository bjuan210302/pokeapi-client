import axios from "axios";
import { useEffect, useState } from "react";

type Meme = {
  ID: number,
  bottomText: string,
  image: string,
  name: string,
  tags: string,
  topText: string,
}

function Memes() {
  const MEMEMAKER_API = import.meta.env.VITE_MEMEMAKER_API_URL;
  const [currentPage, setCurrentPage] = useState(0);
  const [memesCurrentPage, setMemesCurrentPage] = useState<Array<Meme>>([])

  useEffect(() => {
    axios.get(MEMEMAKER_API+currentPage).then((res) => setMemesCurrentPage(res.data));
  }, [])

  return (
    <>
      {memesCurrentPage.map((meme) => <div>{JSON.stringify(meme)}</div>)}
    </>
  );
}

export default Memes;