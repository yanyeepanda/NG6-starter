class AgentsController {
  constructor($http, $q) {
    this.http = $http;
    this.q = $q;
    this.name = 'agents';
    this.agentsList = [];
    this.windowWidth;

    if(window.innerWidth >= 1440){
      this.windowWidth = 'desktop';
    } else if (window.innerWidth > 768){
      this.windowWidth = 'laptop';
    } else if (window.innerWidth > 414){
      this.windowWidth = 'pad';
    } else {
      this.windowWidth = 'phone';
    };

  };

  getAgents(keyword) {
    var apiUrl = 'https://api.ratemyagent.com.au/autosearch/agents?SearchTerm=' + keyword;
    return this.http.get(apiUrl);
    
  }

  searchKeyword(keyword){
    if(keyword){
      this.getAgents(keyword).then((results) =>{
        this.agentsList = results.data.Results;
      });
    };
  };

  $onInit() {
    var url = 'https://api.ratemyagent.com.au/autosearch/agents?Take=60';
    this.http.get(url)
        .then((data) => {
          this.agentsList = data.data.Results;
        });
  }
}

AgentsController.$inject=['$http', '$q'];

export default AgentsController;


