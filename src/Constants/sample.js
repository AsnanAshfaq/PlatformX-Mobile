export const postData = [
  {
    id: 1,
    user_name: 'Asnan Ashfaq',
    date: new Date(),
    description: 'This is the little post',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: 2,
    user_name: 'Shanay ',
    date: new Date(),
    description:
      'ptatem ex blanditiis eligendi rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nulla iusto magni odio, temporibus dicta quasi culpa, ratione id incidunt, porro delectus cupiditate architecto quaerat voluptatem ex blanditiis eligendi rem!',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: 3,
    user_name: 'Ash"es_Everywhere ',
    date: new Date(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nulla iusto magni odio, temporibus dicta quasi culpa, ratione id incidunt, porro delectus cupiditate architecto quaerat voluptatem ex blanditiis eligendi rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nulla iusto magni odio, temporibus dicta quasi culpa, ratione id incidunt, porro delectus cupiditate architecto quaerat voluptatem ex blanditiis eligendi rem!',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
];

export const hackathonData = [
  {
    id: 1,
    date: new Date(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsam error, quaerat autem doloremque nam rem ea illo natus cumque dignissimos fugiat vel eos, illum aut provident quisquam porro ipsum!.Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsam error, quaerat autem doloremque nam rem ea illo natus cumque dignissimos fugiat vel eos, illum aut provident quisquam porro ipsum!',
    event_type: 'Online',
    participants: 299,
    prize: 15000,
    thumbnail_image:
      'https://www.founderpassion.org/wp-content/uploads/2017/09/hackathon-founderpassion-foundation.png',
    user_image:
      'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    user_name: 'Sharp C',
  },
  {
    id: 2,
    date: new Date(),
    description:
      'llo natus cumque dignissimos fugiat vel eos, illum aut provident quisquam porro ipsum!',
    event_type: 'On-Sight',
    participants: 1399,
    prize: 250000,
    thumbnail_image:
      'https://ied.eu/wp-content/uploads/2018/10/TTT-Hackathon@2x.png',
    user_image:
      'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    user_name: 'Sharp C',
  },
  {
    id: 3,
    date: new Date(),
    description:
      'llo natus cumque dignissimos fugiat vel eos, illum aut provident quisquam porro ipsum!',
    event_type: 'Online',
    participants: 5399,
    prize: 350000,
    thumbnail_image:
      'https://glider.ai/content/uploads/sites/6/2018/10/Hachathon.jpg',
    user_image:
      'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    user_name: 'Sharp C',
  },
];

export const hackathonFilterData = [
  {
    id: 'location',
    tag: 'Location',
    subtag: ['Online', 'Onsight'],
  },
  {
    id: 'status',
    tag: 'Status',
    subtag: ['Upcoming', 'Open', 'Ended'],
  },
  {
    id: 'interest tags',
    tag: 'Interest tags',
    subtag: [
      'Social Good',
      'Machine Learning/AI',
      'COVID - 19',
      'Productivity',
      'Blockchain',
    ],
  },
  {
    id: 'Length',
    tag: 'Length',
    subtag: ['1-6 days', '1-4 Weeks', '1+ Month'],
  },
];

export const drawerItems = [
  {
    id: 1,
    label: 'My Activities',
    icon_name: 'home-sharp',
  },
  {
    id: 2,
    label: 'Saved',
    icon_name: 'bookmarks',
  },
  {
    id: 3,
    label: 'Settings',
    icon_name: 'ios-settings-sharp',
  },
  {
    id: 4,
    label: 'Logout',
    icon_name: 'md-log-out-outline',
  },
];
