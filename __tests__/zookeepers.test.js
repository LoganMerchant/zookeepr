const fs = require('fs');
const {
    filterByQuery,
    findById, 
    createNewZookeeper, 
    validateZookeeper,
} = require('../lib/zookeepers.js');
const { zookeepers } = require('../data/zookeepers.json');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        {
            id: "testid123",
            name: "test",
            age: 25,
        }, 
        zookeepers
    );

    expect(zookeeper.id).toBe('testid123');
    expect(zookeeper.name).toBe('test');
    expect(zookeeper.age).toBe(25);
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: "5",
            name: "James",
            age: 30,
            favoriteAnimal: "penguin"
        },
        {
            id: "6",
            name: "Jane",
            age: 34,
            favoriteAnimal: "fox"
        }
    ];

    const updatedZookeepers = filterByQuery({ favoriteAnimal: "fox" }, startingZookeepers);

    expect(updatedZookeepers.length).toBe(1);
});

test('filters by id', () => {
    const startingZookeepers = [
        {
            id: "5",
            name: "James",
            age: 30,
            favoriteAnimal: "penguin"
        },
        {
            id: "6",
            name: "Jane",
            age: 34,
            favoriteAnimal: "fox"
        }
    ];

    const result = findById("5", startingZookeepers);

    expect(result).toMatchObject({
        id: "5",
        name: "James",
        age: 30,
        favoriteAnimal: "penguin"   
    });
});

test('validates zookeeper', () => {
    const correctZookeeper = {
        id: "5",
        name: "James",
        age: 30,
        favoriteAnimal: "penguin"
    };

    const incorrectZookeeper = {
        id: "5",
        name: "James",
        age: "30",
        favoriteAnimal: "penguin"
    };

    expect(validateZookeeper(correctZookeeper)).toBe(true);
    expect(validateZookeeper(incorrectZookeeper)).toBe(false);
});