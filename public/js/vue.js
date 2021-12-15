Vue.component('team-members1', {
    props:['members'],
    template: `
            <div class="col-sm-12 col-md-3">
                <img :src="members.image" :alt="members.alt" width="150px" height="150px">
                <h5>{{ members.name }}</h5>
                <p>{{ members.title }}</p>
            </div>`
})
Vue.component('team-members2', {
    props:['members'],
    template: `
            <div class="col-sm-12 col-md-4">
                <img :src="members.image" :alt="members.alt" width="150px" height="150px">
                <h5>{{ members.name }}</h5>
                <p>{{ members.title }}</p>
            </div>`
})
let app = new Vue({
el: '#teamHeadShots1',
data: {
    team: [
    {
        name: 'Marco Terruzzin',
        title: 'Founder - CEO',
        image: 'images/headshots/marco.jpeg',
        alt: 'Marco'
    },
    {
        name: 'Andrea Pedretti',
        title: 'Co-Founder - CTO',
        image: 'images/headshots/Andrea.jpeg',
        alt: 'Andrea'
    },
    {
        name: 'Julie Sparacio',
        title: 'VP, Marketing & Customer Growth',
        image: 'images/headshots/Julie_Cropped.jpg',
        alt: 'Julie'
    },
    {
        name: 'Andrzej Skoskiewicz',
        title: 'VP, Engineering',
        image: 'images/headshots/andzej.jpeg',
        alt: 'Andrzej'
    }

    ]
},
})

let app2 = new Vue({
el: '#teamHeadShots2',
data: {
    team: [
    {
        name: 'Daniel Han',
        title: 'VP, Strategy & BD',
        image: 'images/headshots/daniel.jpeg',
        alt: 'Daniel'
    },
    {
        name: 'Laetitia Lee',
        title: 'VP, Product',
        image: 'images/headshots/Laetitia.jpeg',
        alt: 'Laetitia'
    },
    {
        name: 'Gianromano Piconi',
        title: 'Director, Operations',
        image: 'images/headshots/Gianromano P_Cropped.png',
        alt: 'Gianromano'
    }
    ]
},
})