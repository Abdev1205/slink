import redis from "../../redis/index.js";
import Url from "../../models/url.js";

export const VisitCountUpdation = async () => {
  try {
    // Getting all keys related to visit counts and device counts
    const visitCountKeys = await redis.keys("visitCount:*");
    const deviceVisitKeys = await redis.keys("deviceVisitCount:*");

    // Process general visit counts
    for (const key of visitCountKeys) {
      const shortUrl = key.split(":")[1];
      const visitCount = await redis.get(key);

      // Update the total visit count in MongoDB
      await Url.updateOne(
        { shortenedUrl: shortUrl },
        {
          $inc: {
            visitCount: parseInt(visitCount),
            totalVisitCount: parseInt(visitCount),
          },
        }
      );

      // Remove the key from Redis after updating
      await redis.del(key);
    }

    // Process device-specific visit counts (mobile, desktop, tablet)
    for (const key of deviceVisitKeys) {
      const [_, shortUrl, deviceType] = key.split(":"); // Extract shortUrl and deviceType from Redis key
      const deviceVisitCount = await redis.get(key);

      if (deviceVisitCount) {
        // Increment the device type visit count in MongoDB
        await Url.updateOne(
          { shortenedUrl: shortUrl },
          { $inc: { [`deviceStats.${deviceType}`]: parseInt(deviceVisitCount) } }
        );

        // Remove the device count key from Redis after updating
        await redis.del(key);
      }
    }

    console.log("Visit counts and device counts successfully updated and flushed to DB");
  } catch (error) {
    console.error("Error flushing visit counts: ", error);
  }
};



