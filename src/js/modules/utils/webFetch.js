export const fetch_data = async (path) => {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error("The fetch response did not return Ok");
    }
    
    const object_data = await response.json();

    return object_data;
  } catch (error) {
    throw new Error("Error fetching command data. " + error.message);
  }
}