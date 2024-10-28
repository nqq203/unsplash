import { useEffect, useState, useCallback, Fragment } from "react";
import styled, { keyframes } from "styled-components";
import { getListPhotos } from "../api/photos";
import PhotoBox from "../components/PhotoBox";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching] = useInfiniteScroll(fetchMorePhotos);
  const [photoIds, setPhotoIds] = useState(new Set());
  const [hasMorePhotos, setHasMorePhotos] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDot, setIsLoadingDot] = useState(false);
  const loaders = [...Array(10)].map((_, index) => <SkeletonLoader key={index} />);

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await getListPhotos({ page });
      if (response) {
        const newPhotos = response?.filter(photo => !photoIds.has(photo.id));
        if (response.length < 20) {
          setHasMorePhotos(false);
        }
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        setPhotoIds(new Set([...photoIds, ...newPhotos.map(photo => photo.id)]));
      } else {
        setHasMorePhotos(false);
        alert('No data returned from API');
      }
    } catch (err) {
      if (err.response?.status === 403) {
        alert('Rate limit exceeded. Please try again later.');
      }
    }
  }, [page]);

  useEffect(() => {
    fetchPhotos();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, [fetchPhotos]);

  useEffect(() => {
    console.log(hasMorePhotos);
  }, [hasMorePhotos]);

  function fetchMorePhotos() {
    if (hasMorePhotos) {
      setPage(prevPage => {
        console.log('call set page');
        console.log(prevPage + 1);
        return prevPage + 1;
      });
    }
  }

  function onClickImage(photoId) {
    console.log('onClickImage');
    navigate(`/photos/${photoId}`);
  }

  useEffect(() => {
    setIsLoadingDot(true);
    setTimeout(() => setIsLoadingDot(false), 2000);
  }, []);

  if (isLoadingDot) {
    return <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "auto", height: "90vh", alignItems: "center" }}>
      <ThreeDots
        height="80"
        width="80"
        color="black"
      />
    </div>
  }

  return (
    <Fragment>
      <GalleryWrapper>
        {photos?.map((photo) => (
          <PhotoBox photo={photo} handleClick={() => onClickImage(photo.id)} key={photo.id} />
        ))}
        {isFetching && loaders}
        {isLoading && loaders}
      </GalleryWrapper>
      {isFetching && <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", width: "auto", alignItems: "center" }}>
        <ThreeDots
          height="80"
          width="80"
          color="black"
        />
      </div>}
    </Fragment>
  )
}

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 40px;
  padding: 16px;
  margin: 20px 20px 0 20px;
`;

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const SkeletonLoader = styled.div`
  width: 100%;
  height: 100%;
  background-color: #eee;
  border-radius: 10px;
  position: relative;
  overflow: hidden; 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &::before {
    content: "";
    display: block;
    height: 90%; 
    background: linear-gradient(to right, #eee 0%, #fff 50%, #eee 100%);
    background-size: 800px 400px;
    animation: ${shimmer} 2s linear infinite;
  }

  &::after {
    content: "";
    display: block;
    height: 10%;
    background: #f0f0f0;
  }
`;