const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

module.exports = createTimeStamp = () => {
    const date = new Date();
    return [date.getFullYear(), date.getDate(), months[date.getMonth()], days[date.getDay()], date.getHours(), date.getMinutes(), date.getSeconds()]
}