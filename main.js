const potterDisplay = document.querySelector('.displayResults');
const groupButtons = document.querySelectorAll('.btn');
const searchBar = document.getElementById('searchbar');

let potterData = [];
let groupData = '';

const fetchData = async () => {
    let urlfetch = groupData === 'students' || groupData === 'staff' 
        ? `http://hp-api.herokuapp.com/api/characters/${groupData}` 
        : `https://hp-api.onrender.com/api/spells`;

    await fetch(urlfetch)
        .then(res => res.json())
        .then((data) => {
            console.log(data);

            if (groupData === 'students' || groupData === 'staff') {
                potterData = data.map((item) => ({
                    name: item.name,
                    img: item.image,
                    ancestry: item.ancestry,
                    house: item.house,
                    wand: {
                        wood: item.wand.wood,
                        core: item.wand.core,
                        length: item.wand.length
                    },
                    patronus: item.patronus,
                }));
            } else {
                potterData = data.map((item) => ({
                    name: item.name,
                    description: item.description
                }));
            }

            potterCards('');
        });
};

const toSentenceCase = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const potterCards = (searchString) => {
    const cards = potterData
        .filter((data) => data.name.toLowerCase().includes(searchString))
        .map((data) => {
            if (groupData === 'students' || groupData === 'staff') {
                return `<div class="card">
                    <div>
                        <img src="${data.img}" alt="${data.name}"/>
                    </div>
                    <div>
                        <p class="description"> Name: ${data.name ? data.name.toUpperCase() : 'None'} </p>
                        <p class="description"> Ancestry: ${data.ancestry ? toSentenceCase(data.ancestry) : 'None'} </p>
                        <p class="description"> House: ${data.house ? toSentenceCase(data.house) : 'None'} </p>
                        <p class="description"> Wand: ${data.wand.wood ? toSentenceCase(data.wand.wood) : 'None'} ${data.wand.core ? toSentenceCase(data.wand.core) : ''} ${data.wand.length ? data.wand.length + ' inches' : ''} </p>
                        <p class="description"> Patronus: ${data.patronus ? toSentenceCase(data.patronus) : 'None'} </p>
                    </div>
                </div>`;
            } else {
                return `<div class="card">
                    <p class="description"> Spell: ${data.name ? data.name.toUpperCase() : 'None'} </p>
                    <p class="description"> Description: ${data.description ? toSentenceCase(data.description) : 'None'} </p>
                </div>`;
            }
        })
        .join('');
    potterDisplay.innerHTML = cards;
};

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    potterCards(searchString);
});

const groupBut = () => {
    groupButtons.forEach((button) => 
        button.addEventListener('click', () => {
            groupData = button.getAttribute('id');
            console.log('Button INFO is ', groupData);
            fetchData(); 
        })
    );
};

fetchData();
groupBut();
