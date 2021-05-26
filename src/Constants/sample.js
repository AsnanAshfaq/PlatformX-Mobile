export const postData = [
  {
    id: 1,
    user_name: 'Asnan Ashfaq',
    date: new Date(),
    description: 'This is the little post',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    likes: 10,
    images:
      'https://www.founderpassion.org/wp-content/uploads/2017/09/hackathon-founderpassion-foundation.png',

    comments: [
      {
        id: 1,
        user_image: 'https://reactnative.dev/img/tiny_logo.png',
        user_name: 'shana_ash',
        text: 'The post is pretty old',
      },
    ],
    shares: 1,
  },
  {
    id: 2,
    user_name: 'Shanay ',
    date: new Date(),
    description:
      'ptatem ex blanditiis eligendi rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nulla iusto magni odio, temporibus dicta quasi culpa, ratione id incidunt, porro delectus cupiditate architecto quaerat voluptatem ex blanditiis eligendi rem!',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    likes: 123,
    comments: [
      {
        id: 1,
        user_image: 'https://reactnative.dev/img/tiny_logo.png',
        user_name: 'shana_ash',
        text:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid ducimus harum doloribus veritatis architecto! Nostrum qui inventore alias assumenda numquam? Quidem, quo qui modi repudiandae non est consectetur odit nobis.',
      },
      {
        id: 2,
        user_image: 'https://reactnative.dev/img/tiny_logo.png',
        user_name: 'asnan_ashfaq',
        text:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid ducimus harum doloribus veritatis architecto! Nostrum qui inventore alias assumenda numquam? Quidem, quo qui modi repudiandae non est consectetur odit nobis.',
      },
    ],
    shares: 14,
  },
  {
    id: 3,
    user_name: 'Ash"es_Everywhere ',
    date: new Date(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nulla iusto magni odio, temporibus dicta quasi culpa, ratione id incidunt, porro delectus cupiditate architecto quaerat voluptatem ex blanditiis eligendi rem!Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nulla iusto magni odio, temporibus dicta quasi culpa, ratione id incidunt, porro delectus cupiditate architecto quaerat voluptatem ex blanditiis eligendi rem!',
    User_image: 'https://reactnative.dev/img/tiny_logo.png',
    likes: 150,
    comments: [
      {
        id: 1,
        user_image: 'https://reactnative.dev/img/tiny_logo.png',
        user_name: 'shana_ash',
        text:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid ducimus harum doloribus veritatis architecto! Nostrum qui inventore alias assumenda numquam? Quidem, quo qui modi repudiandae non est consectetur odit nobis.',
      },
      {
        id: 2,
        user_image: 'https://reactnative.dev/img/tiny_logo.png',
        user_name: 'asnan_ashfaq',
        text:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid ducimus harum doloribus veritatis architecto! Nostrum qui inventore alias assumenda numquam? Quidem, quo qui modi repudiandae non est consectetur odit nobis.',
      },
    ],
    shares: 15,
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

export const profileData = {
  background_image:
    'https://1stwebdesigner.com/wp-content/uploads/2019/07/css-background-effects-thumb.jpg',
  profile_image:
    'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
  first_name: 'Asnan',
  last_name: 'Ashfaq',
  user_name: 'shanay_ash',
  gender: 'Male',
  bio: 'React & React Native Enthusiast',
  date_of_birth: '2nd July, 1999',
  followers: [
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'rcenticelop',
      full_name: 'Rcentice',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'arymenco__',
      full_name: 'Arymenco',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'sadsmali124',
      full_name: 'Sadsmali',
    },
  ],
  following: [
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'rcenticelop',
      full_name: 'Rcentice',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'arymen__co',
      full_name: 'Arymenco',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'sadsmali124',
      full_name: 'Sadsmali',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'foereunfe',
      full_name: 'aslsdadi',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'qwoinoin3',
      full_name: 'asldkno2',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'asxasc',
      full_name: 'akkasjd',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'aksdnkq',
      full_name: 'qowioqiwf',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'askzca',
      full_name: 'oqwiodq',
    },
    {
      user_image:
        'https://scontent.fuet1-1.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=jAumIADtQd4AX90JRFg&_nc_ht=scontent.fuet1-1.fna&oh=dfbd983bfd3cc5c21a5cc7e8095ae27e&oe=60CA9E24',
      user_name: 'kjdnaksd',
      full_name: 'qwqoiwqo',
    },
  ],
  posts: 5,
  lives_in: 'Islamabad',
  education: 'Comsats Islamabad, Pakistan',
  skills: [
    {
      tag: 'React',
      experience: '1 Year',
    },
    {
      tag: 'React Native',
      experience: '1 Year',
    },
  ],
  interests: ['Front End Development', 'Back End Development', 'Gaming'],
};
