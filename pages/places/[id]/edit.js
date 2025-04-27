import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../../components/Form";
import { StyledLink } from "../../../components/StyledLink";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function editPlace(updatedPlace) {
    try {
      console.log("Updating place with ID:", id);
      const response = await fetch(`/api/places/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlace),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update place");
      }
      
      console.log("Place updated successfully");
      router.push(`/places/${id}`);
    } catch (error) {
      console.error("Error updating place:", error);
      alert("Failed to update place. Please try again.");
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <StyledLink href={`/places/${id}`} $justifySelf="start">
        back
      </StyledLink>
      <Form onSubmit={editPlace} formName={"edit-place"} defaultData={place} />
    </>
  );
}
