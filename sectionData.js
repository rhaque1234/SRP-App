export const createSections = (publications) => [
    {
        title: "Jump Back In",
        data: [
            { key: '1', type: 'Publication', name: 'User 1', title: 'Publication ie', date: '2024-07-23', summary: 'Summary of publication ie' },
            { key: '2', type: 'Collection', name: "Collection 2", color: '#562C2C' },
            { key: '3', type: 'Topic', topicName: "Cell Biology", image: require('../../../assets/images/topic_pngs/structuralbio.png') },
            { key: '4', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
            { key: '5', type: 'Collection', name: "Collection 1", color: '#127475' },
        ]
    },
    {
        title: "Newest Publications",
        data: publications.map((pub, index) => ({
            key: `${index}`, // Use a unique key for each item
            type: 'Publication',
            name: pub.name,
            title: pub.title,
            date: pub.date,
            summary: pub.summary,
        })),
    },
    {
      title: "Your Topics",
      data: [
          { key: '11', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
          { key: '12', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
          { key: '13', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
          { key: '14', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
          { key: '15', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
          { key: '16', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
          { key: '17', type: 'Topic', topicName: "Genomics", image: require('../../../assets/images/topic_pngs/genetic.png') },
          { key: '18', type: 'More' }, 
      ]
  },
  {
    title: "Recommended Researchers",
    data: [
        { key: '19', type: 'Researcher', user_id: '1', image: require('../../../assets/images/favicon.png') },
        { key: '20', type: 'Researcher', user_id: '2', image: require('../../../assets/images/adaptive-icon.png') },
        { key: '21', type: 'Researcher', user_id: '3', image: require('../../../assets/images/favicon.png') },
        { key: '22', type: 'Researcher', user_id: '4', image: require('../../../assets/images/adaptive-icon.png') },
        { key: '23', type: 'More' }, // Add "More" here
    ]
    }
];