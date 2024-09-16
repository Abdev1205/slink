import Url from "../../models/url.js";

export const deleteUrl = async (req, res) => {
  try {
    const { urlId } = req.params;

    if (!urlId) {
      console.log("url not specified")
      return res.status(400).json({ message: "URL ID is required", success: false });
    }

    // Find the URL by id and user id (assuming you store user info in req.id)
    const url = await Url.findOne({ _id: urlId, user: req.id });

    // If URL not found or doesn't belong to the user, send a 404 response
    if (!url) {
      return res.status(404).json({ message: "URL not found or permission denied", success: false });
    }

    // Remove the URL
    await url.deleteOne();

    // Send a success response
    return res.status(200).json({ message: "URL deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later.", success: false });
  }
};
