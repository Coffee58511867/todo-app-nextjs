import instance from "../endpoint/api";

const getData = async () => {
  const responce = await fetch("https://jsonplaceholder.typicode.com/users");
  return responce.json();
};

export const getAlbums = async () => {
  const response = await instance.get("/todos");
  return response.data;
};

export default async function About() {
  const users = await getData();
  const albums = await getAlbums();
  console.log(users);
  return (
    <div>
      <button
        
        style={{ borderWidth: 3, backgroundColor: "green", color: "white" , borderRadius: 10, padding: 4}}
      >
        GO TO POSTS LISTS
      </button>
      <h2>Users LIST</h2>
      {users.map((itemList: any) => (
        <li key={itemList.id}>{itemList.name}</li>
      ))}
      {albums.map((itemList: any) => (
        <li key={itemList.id}>{itemList.title}</li>
      ))}
    </div>
  );
}
