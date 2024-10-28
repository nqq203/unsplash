import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPhotoDetail } from "../api/photos";
import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

export default function PhotoDetail() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPhoto(id);
    }
  }, [id]);

  async function fetchPhoto(id) {
    setLoading(true);
    const response = await getPhotoDetail({ id: id });
    setTimeout(() => {
      setPhoto(response);
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    console.log(photo);
  }, [photo, setPhoto]);

  function downloadPhoto(photo) {
    const link = document.createElement('a');
    link.href = photo?.links?.download;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (loading) {
    return <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "auto", height: "90vh", alignItems: "center" }}>
      <ThreeDots color="black" height={80} width={80} />
    </div>
  }

  return (
    <Card>
      <CardHeader>
        <Image src={photo?.urls?.full} alt={photo?.description || photo?.alt_description} onClick={() => downloadPhoto(photo)} />
      </CardHeader>
      <CardBody>
        <Title>{photo?.topics[0]?.title || photo?.alt_description || "No title"}</Title>
        <Description>Description: {photo?.description || "No description provided."}</Description>
        <AuthorInfo>Author: {photo?.user?.name}</AuthorInfo>
        <InfoBlock>
          <InfoTitle>Camera</InfoTitle>
          <InfoText>Model: {photo?.exif?.make || "Unknown"} {photo?.exif?.model || "Camera"}</InfoText>
          <InfoText>Exposure: {photo?.exif?.exposure_time}</InfoText>
          <InfoText>Aperture: {photo?.exif?.aperture}</InfoText>
          <InfoText>Focal Length: {photo?.exif?.focal_length}mm</InfoText>
          <InfoText>ISO: {photo?.exif.iso}</InfoText>
          <Location>Location: {photo?.location?.name}</Location>
        </InfoBlock>
        <TagWrapper>
          {photo?.tags?.map((tag, idx) =>
            <Tag key={idx}>{tag?.title}</Tag>
          )}
        </TagWrapper>
      </CardBody>
    </Card>
  );
}

const Card = styled.div`
  max-width: 1024px;
  width: 95%;  // Use percentage for responsiveness
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  margin: 40px auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {  // Tablet and desktop
    flex-direction: row;
    max-width: calc(100% - 400px);
  }
`;

const CardHeader = styled.div`
  flex: 1;
  overflow: hidden;  // Ensure images scale properly
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
  z-index: 100;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const CardBody = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 767px) {  // Mobile devices
    padding: 10px;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const Tag = styled.div`
  background-color: #eef;
  color: #333;
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 0.9em;
  cursor: pointer;

  &:hover {
    background-color: #dde;
  }
`;

const Location = styled.div`
  font-size: 1em;
  color: #666;
  margin-top: 5px;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 10px 0;
`;

const Title = styled.h1`
  font-size: 1.8em;
  color: #333;
  margin-bottom: 10px;
`;

const InfoBlock = styled.div`
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  width: calc(100% - 50px);
`;

const InfoTitle = styled.h3`
  font-size: 1.2em;
  color: #444;
`;

const InfoText = styled.p`
  font-size: 1em;
  color: #555;
  margin: 5px 0;
`;

const AuthorInfo = styled.div`
  font-size: 1em;
  color: #666;
  margin: 10px 0;
`;