import Mock from 'mockjs';


Mock.mock(/\/api\/rank_retrieve/, 'get', (options) => {
    // 解析 URL 参数
    const url = new URL(options.url, window.location.origin);
    const query = url.searchParams.get("query") || "";
    const collection = url.searchParams.get("collection") || "default_collection";
    const page = parseInt(url.searchParams.get("page")) || 1;
    const page_size = parseInt(url.searchParams.get("page_size")) || 10;
    const source = url.searchParams.get("source") || "all";
  
    // Console 里打印传入的参数
    console.log(" Mock API 被调用！");
    console.log("query:", query);
    console.log("collection:", collection);
    console.log("page:", page);
    console.log("page_size:", page_size);
    console.log("source:", source);
 
  const titles = 
  
  {
    "cache_info": {
        "filter_cache_hits": [],
        "raw_cache_hits": []
    },
    "collection_counts": {
        "court_case": 50381,
        "legislation": 9468
    },
    "page": 1,
    "page_size": 10,
    "pagination": {
        "court_case": {
            "current_page": 1,
            "has_next": true,
            "has_prev": false,
            "page_size": 10,
            "total_docs": 50381,
            "total_pages": 5039
        },
        "legislation": {
            "current_page": 1,
            "has_next": true,
            "has_prev": false,
            "page_size": 10,
            "total_docs": 9468,
            "total_pages": 947
        }
    },
    "query": "law",
    "result_count": {
        "filtered": 59849,
        "total": 59849
    },
    "results": {
        "court_case": [
            {
                "doc_id": "2126",
                "score": 1.8767998159148305,
                "source": "federal_court_of_australia",
                "tf": 839,
                "time": "1999",
                "title": "Nulyarimma v Thompson [1999] FCA 1192"
            },
            {
                "doc_id": "12478",
                "score": 1.871976589942815,
                "source": "federal_court_of_australia",
                "tf": 174,
                "time": "2013",
                "title": "Australian Competition and Consumer Commission v P. T. Garuda Indonesia (No 9) [2013] FCA 323"
            },
            {
                "doc_id": "64762",
                "score": 1.8710396380147811,
                "source": "nsw_caselaw",
                "tf": 420,
                "time": "2020",
                "title": "Council of the Law Society of New South Wales v Taylor [2020] NSWCATOD 55"
            },
            {
                "doc_id": "781",
                "score": 1.8704627958248126,
                "source": "federal_court_of_australia",
                "tf": 103,
                "time": "2000",
                "title": "Matthews v Australian Securities Commission & Investments Commission [2000] FCA 288"
            },
            {
                "doc_id": "6895",
                "score": 1.8700376303557003,
                "source": "federal_court_of_australia",
                "tf": 76,
                "time": "1997",
                "title": "Bond, Alan v Minister for Justice of the Commonwealth of Australia Bond, Alan v Attorney-General of the Commonwealth of Australia [1997] FCA 91"
            },
            {
                "doc_id": "24528",
                "score": 1.8695508006516357,
                "source": "federal_court_of_australia",
                "tf": 339,
                "time": "2017",
                "title": "Trina Solar (US), Inc v Jasmin Solar Pty Ltd [2017] FCAFC 6"
            },
            {
                "doc_id": "6609",
                "score": 1.8690168113727288,
                "source": "federal_court_of_australia",
                "tf": 156,
                "time": "2012",
                "title": "Stewart v Australian Crime Commission [2012] FCAFC 151"
            },
            {
                "doc_id": "61363",
                "score": 1.8684941600788734,
                "source": "nsw_caselaw",
                "tf": 105,
                "time": "2003",
                "title": "Dyer v Dyno Nobel Asia Pacific Limited formerly Dyno Wesfarmers Limited Knuckey & 3 Ors v Dyno Nobel Asia Pacific Limited formerly Dyno Wesfarmers Limited [2003] NSWSC 213"
            },
            {
                "doc_id": "66872",
                "score": 1.8684606018501644,
                "source": "nsw_caselaw",
                "tf": 100,
                "time": "2020",
                "title": "Council of the Law Society of NSW v Brincat [2020] NSWCATOD 108"
            },
            {
                "doc_id": "52364",
                "score": 1.868088390468015,
                "source": "nsw_caselaw",
                "tf": 145,
                "time": "2023",
                "title": "Council of the Law Society of New South Wales v Feng [2023] NSWCATOD 129"
            }
        ],
        "legislation": [
            {
                "doc_id": "5792",
                "score": 3.194204456451531,
                "source": "queensland_legislation",
                "tf": 116,
                "time": "2022",
                "title": "Co-operatives National Law Regulation 2020 (Qld)"
            },
            {
                "doc_id": "15833",
                "score": 3.190364657148663,
                "source": "federal_register_of_legislation",
                "tf": 160,
                "time": "1998",
                "title": "Commonwealth Places (Mirror Taxes) Act 1998 (Cth)"
            },
            {
                "doc_id": "9602",
                "score": 3.190015527123341,
                "source": "federal_register_of_legislation",
                "tf": 148,
                "time": "2011",
                "title": "Australian Energy Market Amendment (National Energy Retail Law) Act 2011 (Cth)"
            },
            {
                "doc_id": "23448",
                "score": 3.1892032547919604,
                "source": "federal_register_of_legislation",
                "tf": 212,
                "time": "2019",
                "title": "Industrial Chemicals (Consequential Amendments and Transitional Provisions) Act 2019 (Cth)"
            },
            {
                "doc_id": "22032",
                "score": 3.188171892731641,
                "source": "federal_register_of_legislation",
                "tf": 562,
                "time": "2001",
                "title": "Corporations (Repeals, Consequentials and Transitionals) Act 2001 (Cth)"
            },
            {
                "doc_id": "6164",
                "score": 3.1873082719540857,
                "source": "tasmanian_legislation",
                "tf": 367,
                "time": "2019",
                "title": "Corporations (Tasmania) Act 1990 (Tas)"
            },
            {
                "doc_id": "2099",
                "score": 3.185876852477692,
                "source": "western_australian_legislation",
                "tf": 432,
                "time": "1990",
                "title": "Corporations (Western Australia) Act 1990 (WA)"
            },
            {
                "doc_id": "4200",
                "score": 3.185249759688593,
                "source": "queensland_legislation",
                "tf": 365,
                "time": "2020",
                "title": "Corporations (Queensland) Act 1990 (Qld)"
            },
            {
                "doc_id": "31267",
                "score": 3.1851582691298623,
                "source": "south_australian_legislation",
                "tf": 413,
                "time": "2021",
                "title": "Corporations (South Australia) Act 1990 (SA)"
            },
            {
                "doc_id": "11152",
                "score": 3.184636146999951,
                "source": "queensland_legislation",
                "tf": 500,
                "time": "2002",
                "title": "Community Services Legislation Amendment Bill 2002 (Qld)"
            }
        ]
    },
    "status": "success"
}

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



Mock.mock(/\/api\/document\?doc_id=\d+/, 'get', (options) => {
  // 解析 URL 参数
  const url = new URL(options.url, window.location.origin);
  const docId = url.searchParams.get('doc_id');

  return {
    content: `this is the content of document ${docId}`
  };
});


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
