
//Please run this snippet in the google chrome console

//I had to do some preprocessing to get the invetory into a JSON object.

// This is a knapsack problem and it is np complete. There is no polynomial algorithm that could analyze all the possibilities and come up with the best one. And I can see why you assigned it.
// My approach to this problem was the simplest.
// 1.	Create an array of the armors as objects.
// 2.	Sort the array by the value of each armor in descending order [ O(nlgn) ]
// 3.	Figure out the least expensive armor to be the extra armor that goes in the set. I assumed it’s the armor with the lowest cost, and is therefore the last armor in the sorted array.
// 4.	Go through the sorted array and pick the first occurrence of each armor type as long as the remaining price is enough to buy the extra armor. [ O(n) ]


let invetory = [
    {
        "armorType": "Helmet",
        "name": "Serpentine Cruz Headpiece",
        "cost": 90,
        "value": 23
    },
    {
        "armorType": "Leggings",
        "name": "Famed Pon Leggings",
        "cost": 87,
        "value": 22
    },
    {
        "armorType": "Leggings",
        "name": "Ursine Trousers",
        "cost": 78,
        "value": 18
    },
    {
        "armorType": "Helmet",
        "name": "Keeton Mask",
        "cost": 77,
        "value": 24
    },
    {
        "armorType": "Leggings",
        "name": "Wolven Shinguards",
        "cost": 75,
        "value": 15
    },
    {
        "armorType": "Leggings",
        "name": "Hansen's Breeches",
        "cost": 69,
        "value": 17
    },
    {
        "armorType": "Helmet",
        "name": "Feline Visor",
        "cost": 68,
        "value": 16
    },
    {
        "armorType": "Chest",
        "name": "Armor de Jandro",
        "cost": 67,
        "value": 22
    },
    {
        "armorType": "Chest",
        "name": "Chestpiece of Vachon",
        "cost": 64,
        "value": 23
    },
    {
        "armorType": "Boots",
        "name": "Diamond Boots",
        "cost": 64,
        "value": 18
    },
    {
        "armorType": "Leggings",
        "name": "Griffin Pants",
        "cost": 62,
        "value": 11
    },
    {
        "armorType": "Chest",
        "name": "Kaer Morhen Armor",
        "cost": 62,
        "value": 21
    },
    {
        "armorType": "Helmet",
        "name": "Ornate Helmet of Cagampan",
        "cost": 60,
        "value": 16
    },
    {
        "armorType": "Chest",
        "name": "Cured Leather Chestpiece",
        "cost": 59,
        "value": 20
    },
    {
        "armorType": "Leggings",
        "name": "Tanned Leg Protection",
        "cost": 59,
        "value": 15
    },
    {
        "armorType": "Chest",
        "name": "Smith's Plated Chestguard",
        "cost": 58,
        "value": 10
    },
    {
        "armorType": "Chest",
        "name": "Dented Plate Armor",
        "cost": 57,
        "value": 19
    },
    {
        "armorType": "Leggings",
        "name": "Manticore Braces",
        "cost": 56,
        "value": 12
    },
    {
        "armorType": "Chest",
        "name": "Jeweled Drake Tunic",
        "cost": 55,
        "value": 19
    },
    {
        "armorType": "Chest",
        "name": "Ginger's Gilded Armor",
        "cost": 54,
        "value": 18
    },
    {
        "armorType": "Helmet",
        "name": "Offner Protector",
        "cost": 54,
        "value": 15
    },
    {
        "armorType": "Leggings",
        "name": "Mail Emares Leggings",
        "cost": 53,
        "value": 14
    },
    {
        "armorType": "Boots",
        "name": "Steel Boots",
        "cost": 52,
        "value": 14
    },
    {
        "armorType": "Boots",
        "name": "Tate's Spiked Cleats",
        "cost": 52,
        "value": 20
    },
    {
        "armorType": "Chest",
        "name": "Garcia Guard",
        "cost": 50,
        "value": 17
    },
    {
        "armorType": "Helmet",
        "name": "Leather Helmet",
        "cost": 49,
        "value": 13
    },
    {
        "armorType": "Leggings",
        "name": "Woven Leggings",
        "cost": 47,
        "value": 11
    },
    {
        "armorType": "Helmet",
        "name": "Sligar's Noggin Protector",
        "cost": 46,
        "value": 12
    },
    {
        "armorType": "Leggings",
        "name": "Silken Pants",
        "cost": 45,
        "value": 10
    },
    {
        "armorType": "Helmet",
        "name": "Glass Bowl",
        "cost": 44,
        "value": 12
    },
    {
        "armorType": "Leggings",
        "name": "Tattered Shorts",
        "cost": 42,
        "value": 13
    },
    {
        "armorType": "Boots",
        "name": "Leather Lunde Shoes",
        "cost": 35,
        "value": 7
    },
    {
        "armorType": "Boots",
        "name": "Cloth Shoes",
        "cost": 33,
        "value": 5
    }
];


invetory.sort((a, b) => b.value - a.value);


console.log('invetory sorted by value', invetory);

let crownsAvailable = 300;

let bestSet = {}

extraArmorCostWithLowestValue = invetory[invetory.length - 1].cost; // needed if we need an extra armor in the best set

for (let i = 0; i < invetory.length; i++) {
    if (bestSet['Helmet'] && bestSet['Chest'] && bestSet['Leggings'] && bestSet['Boots'] && bestSet['Extra'] || crownsAvailable == 0) {
        break; // if the set is already full or crow is used up
    }
    if (bestSet['Helmet'] && bestSet['Chest'] && bestSet['Leggings'] && bestSet['Boots'] && crownsAvailable - invetory[i].cost >= 0) {
        bestSet['Extra'] = { armorType: invetory[i].armorType, name: invetory[i].name } //adds the highest extra with the amount of crowns left
        crownsAvailable -= invetory[i].cost;
    }
    if (bestSet[invetory[i].armorType]) {
        continue; // if the type of armor is already in the set
    }
    if (crownsAvailable - invetory[i].cost >= extraArmorCostWithLowestValue) {
        bestSet[invetory[i].armorType] = invetory[i].name; // add the armor with the highest value
        crownsAvailable -= invetory[i].cost;
    }

}

console.log('best set', bestSet);
console.log('remaining crowns', crownsAvailable);