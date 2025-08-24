import { useEffect, useState } from "react";
import { getProducts } from "../lib/productStore";

export default function AdminProducts(){
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getProducts());
  }, []);