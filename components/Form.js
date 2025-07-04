import styled from "styled-components";
import { StyledButton } from "./StyledButton";
import useSWR from "swr";
export const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
`;
export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;
export const Textarea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;
export const Label = styled.label`
  font-weight: bold;
`;
//updating submit handler
export default function Form({ onSubmit, formName, defaultData }) {
  const {mutate}= useSWR("@/pages/api/places/index");
  
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Only make the API call if this is a create form (no defaultData)
    if (!defaultData) {
      try {
        const response = await fetch("/api/places", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          mutate();
        }
      } catch (error) {
        console.error("Error creating place:", error);
      }
    }
    
    // Always call the onSubmit prop with the form data
    onSubmit(data);
    
    // Reset form and focus on name field
    form.reset();
    form.elements.name.focus();
  }
  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        // required
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData?.name}
      />
      <Label htmlFor="image-url">Image Url</Label>
      <Input
      // required
        id="image-url"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
      />
      <Label htmlFor="location">Location</Label>
      <Input
      // required
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
      />
      <Label htmlFor="map-url">Map Url</Label>
      <Input
      // required
        id="map-url"
        name="mapURL"
        type="text"
        defaultValue={defaultData?.mapUrl}
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
      // required
        name="description"
        id="description"
        cols="30"
        rows="10"
        defaultValue={defaultData?.description}
      ></Textarea>
      <StyledButton type="submit">
        {defaultData ? "Update place" : "Add place"}
      </StyledButton>
    </FormContainer>
  );
}










