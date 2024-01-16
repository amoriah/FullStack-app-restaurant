const borsсh = {
    id: 1,
    name: 'Борщ',
    image: '/jpeg/borsch.jpeg',
    description: `Гримируют городу Круппы и Круппики\nгрозящих бровей морщь,\nа во рту\nумерших слов разлагаются трупики,\nтолько два живут, жирея —\n«сволочь»\nи еще какое-то,\nкажется — «борщ».`,
    callories: '57.7',
    cost: 200,
};

const puree = {
    id: 2,
    name: 'Пюрешка с котлеткой',
    image: '/jpeg/puree.jpeg',
    description: `Однажды,\nТочнее, когда-то и где-то\nС голодным Котом\nПовстречалась Котлета.\nКотлета, представьте,\nВсплеснула руками: —\nАх, как же я счастлива\nВстретиться с вами!`,
    callories: '57.7',
    cost: 150,
};

const cabbage = {
    id: 3,
    name: 'Квашенная капустка',
    image: '/jpeg/cabbage.jpeg',
    description:
        'Это барыня-капуста\nЗавернула листья в шар.\n«С клюквой будет очень вкусно» —\nТак сказал нам кулинар.',
    callories: '19',
    cost: 70,
};

const pancakes = {
    id: 4,
    name: 'Блины с маслом',
    image: '/jpeg/pancakes.jpeg',
    description: `Они хранили в жизни мирной\nПривычки милой старины:\nУ них на масленице жирной\nВодились русские блины.`,
    callories: '250',
    cost: 90,
};

const tea = {
    id: 5,
    name: 'Чай',
    image: '/jpeg/tea.jpeg',
    description:
        'Глухая тоска без причины\nИ дум неотвязный угар.\n Давай-ка, наколем лучины,\nРаздуем себе самовар!',
    callories: '100500',
    cost: 20,
};

const menuNames = [
    'Борщ',
    'Пюрешка с котлеткой',
    'Квашенная капустка',
    'Блины с маслом',
    'Чай',
];

const menu = [borsсh, puree, cabbage, pancakes, tea];

const menuObject = {
    menuNames,
    menu,
};

export default menuObject;
