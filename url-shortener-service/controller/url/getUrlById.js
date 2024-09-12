import Url from "../../models/url.js";

// Get a single URL by ID
export const getUrlById = async (req, res) => {
  try {
    const userId = req.id;
    const urlId = req.params.id;

    const url = await Url.findOne({ _id: urlId, user: userId }).exec();

    if (!url) {
      return res.status(404).json({ message: 'URL not found' });
    }

    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};