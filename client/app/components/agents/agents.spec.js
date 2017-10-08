import AgentsModule from './agents';
import AgentsController from './agents.controller';
import AgentsComponent from './agents.component';
import AgentsTemplate from './agents.html';

describe('Agents', () => {
  let $rootScope, $httpBackend, $state, $location, $componentController, makeController;

  beforeEach(window.module(AgentsModule));
  beforeEach(inject((_$rootScope_, _$httpBackend_, $injector) => {
    makeController = () => {
      return new AgentsController();
    };
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $componentController = $injector.get('$componentController');
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('Agents component should be visible when navigates to /agents', () => {
      $location.url('/agents');
      $rootScope.$digest();
      expect($state.current.component).to.eq('agents');
    });
  });

  describe('Controller', () => {
    // controller specs

    let controller;
    beforeEach(() => {
      controller = $componentController('agents', {
        $scope: $rootScope.$new()
      });
    });
    
    it('has a agentsList property', () => { // erase if removing this.name from the controller
      expect(controller).to.have.property('agentsList');
    });

    it('get a list which length is 10', () => { 
      var $scope = {};
      $scope.list=[];
      
      $httpBackend.whenGET('https://api.ratemyagent.com.au/autosearch/agents?SearchTerm=').respond(
      200,
      {
        data: [0,1,2,3,4,5,6,7,8,9]
      });
      controller.http.get('https://api.ratemyagent.com.au/autosearch/agents?SearchTerm=').then((result) => {
         $scope.list = result.data;
      })
      $httpBackend.flush();
      expect($scope.list.data.length).to.equal(10);
    });

    it('get a list with agents', () => { 
      var $scope = {};
      $scope.list=[];
      
      $httpBackend.whenGET('https://api.ratemyagent.com.au/autosearch/agents?SearchTerm=DummyTest').respond(
      200,
      {
        data:[
          {
            "AutoSearchType": "Agents",
            "Id": "aa138",
            "AutoSearchSubType": null,
            "SearchName": null,
            "Name": "Aaron Ward",
            "SecondaryName": "John Ward Prestige Realty",
            "RawName": null,
            "Coords": {
                "Lat": -33.808174047223666,
                "Lon": 151.13590413218012
            },
            "Url": "/real-estate-agent/aaron-ward-aa138/reviews",
            "Location": "Sydney, New South Wales",
            "ImageUrl": "https://cdn.digitalcastle.com.au/photo/283aeb8d-79e0-4a15-b667-248ec07b5f63.png",
            "Awards": {
                "Has2017Award": false
            },
            "BackgroundColour": null,
            "StateAbbreviation": null,
            "ParentLocationIds": null,
            "Postcode": null,
            "Stub": null
        },
        {
            "AutoSearchType": "Agents",
            "Id": "aa295",
            "AutoSearchSubType": null,
            "SearchName": null,
            "Name": "Adam Hanley",
            "SecondaryName": "Impact Realty Group",
            "RawName": null,
            "Coords": {
                "Lat": -37.961222293638585,
                "Lon": 144.97694304213337
            },
            "Url": "/real-estate-agent/adam-hanley-aa295/reviews",
            "Location": "Melbourne, Victoria",
            "ImageUrl": "https://cdn.digitalcastle.com.au/photo/373f296d-4d35-45f0-b3de-f8874b20e287.png",
            "Awards": {
                "Has2017Award": false
            },
            "BackgroundColour": null,
            "StateAbbreviation": null,
            "ParentLocationIds": null,
            "Postcode": null,
            "Stub": null
          }
        ]
      });
      controller.getAgents('DummyTest').then((result) => {
         $scope.list = result.data.data;
      })
      $httpBackend.flush();
      expect($scope.list[0].Name).to.equal('Aaron Ward');
      expect($scope.list[1].SecondaryName).to.equal('Impact Realty Group');
    });

  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has agentsList in template', () => {
      expect(AgentsTemplate).to.match(/\$ctrl\.agentsList/g);
    });
    it('has searchKeyword in template', () => {
      expect(AgentsTemplate).to.match(/\$ctrl\.searchKeyword/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = AgentsComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(AgentsTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(AgentsController);
    });
  });

});
