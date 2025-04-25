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
    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      });
      if (!response.ok) {
        throw new Error("Failed to create place");
      }
      await response.json();
      router.push("/");
    } catch (error) {
      console.error("Error creating place:", error);
      alert("Failed to create place. Please try again.");
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