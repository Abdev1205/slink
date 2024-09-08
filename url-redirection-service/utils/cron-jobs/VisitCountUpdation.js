import redis from "../../redis/index.js";
import Url from "../../models/url.js";

// A function to periodically flush visit counts from Redis to MongoDB
export const VisitCountUpdation = async () => {
  try {
    // Getting all keys matching visit counts
    const keys = await redis.keys("visitCount:*");

    for (const key of keys) {
      const shortUrl = key.split(":")[1];
      const visitCount = await redis.get(key);

      // Updating the visit count in the MongoDB
      await Url.updateOne({ shortenedUrl: shortUrl }, { $inc: { visitCount: parseInt(visitCount) } });

      // Removing the key from Redis after updating
      await redis.del(key);
    }
    console.log("Visit counts flushed to DB");
  } catch (error) {
    console.error("Error flushing visit counts: ", error);
  }
};


