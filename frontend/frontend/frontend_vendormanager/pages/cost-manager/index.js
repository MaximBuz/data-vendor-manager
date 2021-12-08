export default function Home() {
  const fetchData = async () => {
    const url = new URL("http://localhost:8000/api/data_consumers/");
    fetch(url)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return <h1 onClick={fetchData}>Cost Manager</h1>;
}
