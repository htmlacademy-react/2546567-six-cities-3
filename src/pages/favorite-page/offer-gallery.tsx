function OfferGallery({ pictures }: { pictures: string[] }): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {pictures?.map((picture: string) => (
          <div className="offer__image-wrapper" key={`${picture}`}>
            <img className="offer__image" src={picture} alt="Photo studio" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
