import styled from "styled-components";

export default function PhotoBox({ photo, handleClick }) {
  return (
    <>
      <PhotoItem onClick={handleClick}>
        {/* <ImageWrapper> */}
          <Image src={photo.urls.thumb} alt={photo.description} />
        {/* </ImageWrapper> */}
        <Author>{photo.user.name}</Author>
      </PhotoItem>
    </>
  )
}

const PhotoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0s;
  cursor: pointer;
  position: relative;
  z-index: 1; 
  background-color: white;
  border-radius: 10px;

  &:hover {
    transform: scale(1.1);
    z-index: 10; 
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Author = styled.p`
  padding: 8px;
  margin: 0;
  color: #333;
  height: 50px;
  font-weight: bold;
  font-size: 1em;
  display: flex;
  align-items: center;
`;