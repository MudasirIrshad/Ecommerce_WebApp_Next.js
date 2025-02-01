import Portal from "../../../../packages/ui/components/Portal";

export default function portal() {
  return (
    <>
      <Portal
        link={{
          addProducts: "/addProducts",
          viewCustomers: "/viewCustomers",
          publishdedProducts: "/publishedProducts",
          unpublishdedProducts: "/unPublishedProducts",
        }}
      />
    </>
  );
}
