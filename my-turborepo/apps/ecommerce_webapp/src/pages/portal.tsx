import Chart from "../../../../packages/ui/components/Chart";
import Portal from "../../../../packages/ui/components/Portal";

export default function portal() {
  return (
    <div>
      <Portal
        link={{
          addProducts: "/addProducts",
          viewCustomers: "/viewCustomers",
          publishdedProducts: "/publishedProducts",
          unpublishdedProducts: "/unPublishedProducts",
        }}
      />
      <Chart />
    </div>
  );
}
