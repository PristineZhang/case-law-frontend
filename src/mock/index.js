import Mock from 'mockjs';


Mock.mock('/api/titles', 'get', () => {
 
  const titles = {
    title:[
      {
        id:"1",
        title: 'Case Title 1',
        date: '2020-11-22',
        source: 'federal court of Australia',
      },
      {
        id:"2",
        title: 'Case Title 2',
        date: '2020-11-22',
        source: 'federal court of Australia',
      },
      {
        id:"3",
        title: 'Case Title 3',
        date: '2020-11-22',
        source: 'federal court of Australia',
      },
      {
        id:"4",
        title: 'Case Title 4',
        date: '2020-11-22',
        source: 'federal court of Australia',
      },
      {
        id:"5",
        title: 'Case Title 5',
        date: '2020-11-22',
        source: 'federal court of Australia',
      },
      {
        id:"6",
        title: 'Case Title 6',
        date: '2020-11-22',
        source: 'federal court of Australia',
      },
    ],
    case:"879",
    legislation:"230"
  };

  // Return the filtered titles
  return { titles };
}); 
Mock.mock('/api/case-by-year', 'get', () => {
  return {
    caseByYear: {
      year:['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      val:[5000, 23400, 10000, 22000, 30000, 15000, 23400]
    }
  };
});

Mock.mock('/api/source-analytics', 'get', () => {
  // Mock data for source analytics (ECharts pie chart)
  return {
    sourceAnalytics: [
      { name: 'court1', value: 1048 },
      { name: 'court2', value: 735 },
      { name: 'court3', value: 580 },
    ],
  };
});

// todo 改成数据里有的
Mock.mock('/api/filters', 'get', () => {
  // Mock data for filter options
  return {
    time: [
      { year: '2024' },
      { year: '2023' },
      { year: '2022' },
      { year: '2020' },
    ],
    source: [
      { source: 'federal court of Australia1', val: 1 },
      { source: 'federal court of Australia2', val: 2 },
      { source: 'federal court of Australia3', val: 3 },
      { source: 'federal court of Australia4', val: 4 },
    ],
  };
})


Mock.mock('/api/chatbot', 'post', () => {
  // Mock data for filter options
  return {
    answer: "This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.This is the chatbot's response based on your question.",
    links: [
      "https://example.com/article1" ,
      "https://example.com/article2" ,
      "https://example.com/article3" ,
      "https://example.com/article4" ,
      "https://example.com/article5" ,
      "https://example.com/article6" ,
      "https://example.com/article7" ,
    ],
  };
});
