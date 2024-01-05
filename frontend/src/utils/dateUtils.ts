export function convertTimestampToFormattedDate(timestamp: string) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dateObject = new Date(timestamp);
    const monthIndex = dateObject.getUTCMonth();
    const day = dateObject.getUTCDate();
    const year = dateObject.getUTCFullYear();

    const formattedDate = `${months[monthIndex]} ${day}, ${year}`;
    return formattedDate;
}
