import styled from "styled-components";
import Card from "../components/Card";
import useSWR from "swr";
import { StyledLink } from "../components/StyledLink";

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/places", { fallbackData: [] });

  if (error) return <div>Failed to load places: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No places found</div>;

  return (
    <>
      <ListContainer>
        {data.map((place) => {
          return (
            <li key={place._id || place.id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={place._id || place.id}
              />
            </li>
          );
        })}
      </ListContainer>
      <FixedLink href="/create">+ place</FixedLink>
    </>
  );
}
