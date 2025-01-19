import axios from "axios";

export default function Home() {
  return (
    <>
      <button
        onClick={() => {
          axios
            .post("/api/logout")
            .then((res) => {
              console.log("logged out", res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        delete
      </button>
    </>
  );
}
