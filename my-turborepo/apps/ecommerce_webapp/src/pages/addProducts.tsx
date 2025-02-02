import axios from "axios";
import AddProducts from "../../../../packages/ui/components/AddProducts";
import { useRouter } from "next/router";
export default function addProducts() {
  const router = useRouter();
  return (
    <div>
      <AddProducts
        onClick={async (title, price, description, imageLink, published) => {
          try {
            await axios.post("/api/admin/addproduct", {
              title,
              price,
              description,
              imageLink,
              published,
            });
            alert("Product added successfully!");
            router.push("/portal");
          } catch (error) {
            alert(error);
          }
        }}
      />
    </div>
  );
}
