import Url from "../../models/url.js";

const delteGuestExpiredLinks = async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Deleting URLs created by guests that are older than 24 hours
    await Url.deleteMany({
      createdBy: { $exists: true }, // Only for guests (those with guestId)
      createdAt: { $lt: twentyFourHoursAgo },
    });

    console.log('Deleted expired guest URLs');
  } catch (error) {
    console.error('Error cleaning up expired guest URLs:', error);
  }
}

export default delteGuestExpiredLinks;