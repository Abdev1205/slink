import Url from "../../models/url.js";
import redis from "../../redis/index.js";

export const redirectUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  console.log("short url", shortUrl);

  // checking in cache
  let longUrl = await redis.get(shortUrl);
  console.log("long url", longUrl);
  if (longUrl) {
    // Incrementing visit count in Redis
    await redis.incr(`visitCount:${shortUrl}`);
    // return res.status(301).redirect(longUrl); // 301 for permanent redirect
    return res.status(200).json({ message: "Long url Found successfully", longUrl });
  }

  try {
    const url = await Url.findOne({ shortenedUrl: shortUrl });
    console.log("url, ", url);
    if (url) {
      longUrl = url.originalUrl;

      // Cache the long URL and increment the visit count
      redis.setex(shortUrl, 60 * 60 * 24, longUrl); // cache for 24 hours
      await redis.incr(`visitCount:${shortUrl}`);

      return res.status(200).json({ message: "Long url Found successfully", longUrl });
    }
    return res.status(404).json({ message: "Short Url not found", shortUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went Wrong", shortUrl, error });
  }
};
