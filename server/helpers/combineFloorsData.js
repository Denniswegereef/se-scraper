module.exports = combineFloors = (response) => {
    const available = [];
    const reserved = [];
    const rented = [];

    response.floors.forEach(floor => {
        available.push(...floor.available);
        reserved.push(...floor.reserved);
        rented.push(...floor.rented);
    });

    return {
        available,
        reserved,
        rented
    }
}