import { useEffect, useState } from "react";
import { getProducts } from "../lib/productStore";

export default function AdminProducts() {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList(getProducts());
    }, []);

    return (
        <div>
            <h2>Admin: Products</h2>

            <section style={{ marginTop: 16 }}>
                <h3>Products List</h3>
            </section>
        </div>
    )

}
