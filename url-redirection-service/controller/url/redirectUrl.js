import Url from "../../models/url.js";
import redis from "../../redis/index.js";

export const redirectUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  console.log("short url", shortUrl)

  // checking in cache
  let longUrl = await redis.get(shortUrl);
  console.log("long url", longUrl)
  if (longUrl) {
    return res.status(201).redirect(longUrl);
  }

  try {
    const url = await Url.find({ shortenedUrl: shortUrl });
    console.log("url, ", url)
    if (url) {
      longUrl = url[0].originalUrl;
      redis.setex(shortUrl, 60 * 60 * 24, longUrl); // cache for 24 hours
      return res.status(201).redirect(longUrl);
    }
    return res.status(404).send("Short URL not found");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

