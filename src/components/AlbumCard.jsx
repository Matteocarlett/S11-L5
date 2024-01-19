import { Link } from "react-router-dom";

const AlbumCard = (props) => {
  return (
    <div className="col text-center">
      <Link to={`/albumPage/${props.albumInfo.album.id}`}>
        <img
          className="img-fluid rounded"
          src={props.albumInfo.album.cover_medium}
          alt="1"
        />
      </Link>
      <p className="text-truncate mt-3">
        <Link to={`/albumPage/${props.albumInfo.album.id}`}>
          Album: "{props.albumInfo.album.title.length < 18
            ? props.albumInfo.album.title
            : props.albumInfo.album.title.substring(0, 18)}..."
        </Link>
        <br />
        <Link to={`/artistPage/${props.albumInfo.artist.id}`}>
          Artist: {props.albumInfo.artist.name}
        </Link>
      </p>
    </div>
  );
};

export default AlbumCard;
