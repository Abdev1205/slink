import Url from "../../models/url.js";
import redis from "../../redis/index.js";
import UAParser from 'ua-parser-js'

const parseDeviceType = (userAgent) => {
  const parser = new UAParser(userAgent);
  console.log("parser :", JSON.stringify(parser));
  const deviceType = parser?.getDevice()?.type; // Default to 'desktop' if no type is found
  return deviceType;
};

export const redirectUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const userAgent = req.headers['user-agent']; // Get the User-Agent from the request
  const deviceType = userAgent.includes("Mobi") ? "mobile" : "desktop"; // Default to mobile/desktop based on userAgent

  // checking in cache
  let longUrl = await redis.get(shortUrl);
  if (longUrl) {
    // Incrementing visit count in Redis
    await redis.incr(`visitCount:${shortUrl}`);

    // Increment the device type visit count in Redis
    await redis.incr(`deviceVisitCount:${shortUrl}:${deviceType}`);

    return res.redirect(longUrl);
  }

  try {
    const url = await Url.findOne({ shortenedUrl: shortUrl });
    if (url && (url?.status === 'inactive' || url?.status === 'expired')) {
      const errorType = url.status === 'inactive' ? 'URLInactive' : 'URLExpired';
      return res.redirect(`${process.env.FRONTEND_URL}/${shortUrl}?error=${errorType}`);
    }
    if (url && url?.originalUrl) {
      longUrl = url?.originalUrl;

      // Cache the long URL and increment the visit count
      redis.setex(shortUrl, 60 * 60 * 24, longUrl); // Cache for 24 hours
      await redis.incr(`visitCount:${shortUrl}`);

      // Increment the device type visit count in Redis
      await redis.incr(`deviceVisitCount:${shortUrl}:${deviceType}`);

      return res.redirect(longUrl);
    }

    return res.redirect(`${process.env.FRONTEND_URL}/${shortUrl}?error=URLNotFound`);
  } catch (error) {
    console.error(error);
    return res.redirect(`${process.env.FRONTEND_URL}/${shortUrl}?error=URLNotFound`);
  }
};
