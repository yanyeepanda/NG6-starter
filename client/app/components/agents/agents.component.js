import template from './agents.html';
import controller from './agents.controller';
import './agents.scss';

let agentsComponent = {
  bindings: {},
  template,
  controller: function() {
    this.searchKeyword = function(keyword){
      console.log('click', keyword);
    };

    // $http.get('https://api.ratemyagent.com.au/autosearch/agents')
    //      .then(function(data) {
    //        console.log(data);
    //       return data;
    //      });

  }
};

export default agentsComponent;
