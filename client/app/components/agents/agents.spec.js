import AgentsModule from './agents';
import AgentsController from './agents.controller';
import AgentsComponent from './agents.component';
import AgentsTemplate from './agents.html';

describe('Agents', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AgentsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AgentsController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(AgentsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
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
