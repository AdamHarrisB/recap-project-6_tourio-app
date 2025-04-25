import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";
import useSWR from "swr";
import dbConnect from "@/lib/_db_Connect";
import Place from "@/db/models/tourio";
const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;
export default function CreatePlacePage() {
  const router = useRouter();
  async function addPlace(place) {
    // console.log("adding place");
    if (requestAnimationFrame.method==="POST"){
      try {const placeData = requestAnimationFrame.body;
        await Place.create(placeData);
        response.status(201).json({status:"Place Created"});
      } catch (error){
        console.log(error);
        response.status(400).json({error:error.message});
      }
    }
  }
  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <Form onSubmit={addPlace} formName={"add-place"} />
    </>
  );
}