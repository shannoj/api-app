interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface renderArtistProps {
  artists: Array<any>;
}

const RenderArtists = ({ artists }: renderArtistProps) => {
  return artists.map((artist: Artist) => (
    <div key={artist.id}>
      {artist.images.length ? (
        <img width={"100%"} src={artist.images[0].url} alt="" />
      ) : (
        <div>No Image</div>
      )}
      {artist.name}
    </div>
  ));
};

export default RenderArtists;
