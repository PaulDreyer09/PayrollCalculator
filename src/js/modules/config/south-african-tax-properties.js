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
    rate: 1,
    ceiling: 17712, // Monthly UIF ceiling
}

export const inputList = [
    {
        name: 'age',
        type: 'number',
        labelString: 'Age'
    },
    {
        name: 'salary',
        type: 'number',
        labelString: 'Salary'
    },
    {
        name: 'periodsPerAnnum',
        type: 'select',
        labelString: 'Period'
    }
]

export const outputList = [
    {
        name: 'deAnnualizedNetPaye',
        labelString: 'PAYE',
    },
    {
        name: 'deAnnualizedUif',
        labelString: 'UIF',
    },
    {
        name: 'netSalary',
        labelString: 'Net Salary',
    }
]