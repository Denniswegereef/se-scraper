module.exports = createMailTemplate = (data = {}) => {
    return `
    <h2>There are new rooms available <bold>${data.name}</bold></h2>
    <p>Time: ${data.timestamp}</p>

    <h3>Building name ${data.buildingName}</h3>

    ${data.floors.map(floor => {
        if (!floor.available.length == 1) return;

        return `
        <p><bold>${floor.name}</bold></p>
        <a href="${floor.url}">Go to page for ${floor.name.toLowerCase()}</a>
        <ul>
        ${floor.available.map(number => {
            return `
                <li>Number: ${number}</li>
            `
        }).join('')}
        </ul>
        `
    }).join('')}
    `
}