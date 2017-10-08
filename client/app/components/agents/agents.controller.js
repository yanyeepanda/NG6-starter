class AgentsController {
  constructor($http, $q) {
    this.http = $http;
    this.q = $q;
    this.name = 'agents';
    this.agentsList = [];

    // var getAgents = function (){
    //   this.http.get(apiUrl)
    //       .then(function(data) {
    //         console.log(data);
    //         this.agents = data.data.Results;
    //       });
    // };

  
  };


  getAgents(keyword) {
    var defer = this.q.defer();

    var apiUrl = 'https://api.ratemyagent.com.au/autosearch/agents?SearchTerm=' + keyword;
      this.http.get(apiUrl)
            .then(function(data) {
              defer.resolve(data.data.Results);
            });
        return defer.promise;
  }

  searchKeyword(keyword){
    if(keyword){
      this.getAgents(keyword).then((results) =>{
        this.agentsList = results;
      });
    };
  };
}

AgentsController.$inject=['$http', '$q'];

export default AgentsController;


