import { getAlbums } from "../page"
export default async function AlbumList(){
    const albums = await getAlbums();
    return(
        <div style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30}}>
            <h1>Album List Below</h1>
            {
                albums.map((item: any) => (
                    <ul key={item.id}>
                        <li>{item.title}</li>
                    </ul>
                ))
            }
        </div>
    )
}