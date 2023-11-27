export class MockCommand {
  constructor(param) {
    this.param = param;
  }

  accept(visitor) {
    return visitor;
  }
}

export const AbstractFactory = jest.fn().mockImplementation(function(){
    this.register_class = jest.fn(),
    this.get_class_instance = jest.fn(() => new MockCommand())
});