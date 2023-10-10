export const currencyCharacter = "R";

export const periodOptions = [
    {
        text: "Weekly",
        value: 52
    },
    {
        text: "Every 2 Weeks",
        value: 26
    },
    {
        text: "Monthly",
        value: 12
    },
    {
        text: "Yearly",
        value: 1
    }
];

export const taxRebatesBrackets = [
    {
        max: 65,
        value: 17235
    },
    {
        max: 75,
        value: 9444
    },
    {
        max: Infinity,
        value: 3145
    },
];

export const taxBrackets = [
    {
        max: 237100,
        rate: 18
    },
    {
        max: 370500,
        rate: 26
    },
    {
        max: 512800,
        rate: 31
    },
    {
        max: 673000,
        rate: 36
    },
    {
        max: 857900,
        rate: 39
    },
    {
        max: 1817000,
        rate: 41
    },
    {
        max: Infinity,
        rate: 45
    },
];

export const uifOptions = {
    percentage: 1,
    ceiling: 17712, // Monthly UIF ceiling
}