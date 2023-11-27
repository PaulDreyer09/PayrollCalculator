import { AbstractFactory } from './abstractFactory'; 

// Sample class for testing
class SampleClass {
  constructor(param) {
    this.param = param;
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }
}

describe("AbstractFactory Tests", () => {
  let factory = new AbstractFactory();

  beforeEach(() => {
    factory = new AbstractFactory();
  })

  it("Registering and getting a class constuctor", () => {
    factory.register_class(SampleClass);
    expect(factory._get_class_constructor("SampleClass")).toBe(SampleClass);
  });

  it("Registering and creating a class instance", () => {
    factory.register_class(SampleClass);
    const instance = factory.get_class_instance({class_name: "SampleClass", params: ['Some String']})
    expect(instance.constructor).toBe(SampleClass);
    expect(instance.param).toBe('Some String');
  });

  it("Registering a duplicate class", () => {
    factory.register_class(SampleClass);
    expect(() => {factory.register_class(SampleClass)}).toThrow();
  });

  it("Registering and creating a composite class", () => {
    factory.register_class(SampleClass);
    const instance = factory.get_class_instance({
      class_name: "SampleClass", 
      params: ['Parent'], 
      children: [{class_name: "SampleClass", params: ['Child']}]
    });

    const child_instance = instance.children[0];
  
    expect(child_instance.constructor).toBe(SampleClass)
    expect(child_instance.param).toBe("Child")
  })

  it("Try to get an unregistered class constructor", () => {
    expect(() => factory._get_class_constructor("UnregisteredClass")).toThrow();
  })

  it("Try to call register_class with passing an invalid parameter", () => {
    expect(() => factory.register_class("Invalid")).toThrow();
    expect(() => factory.register_class(12)).toThrow();
    expect(() => factory.register_class(true)).toThrow();
    expect(() => factory.register_class(undefined)).toThrow();
    expect(() => factory.register_class(null)).toThrow();
    expect(() => factory.register_class([])).toThrow();
    expect(() => factory.register_class({})).toThrow();
  })
  
  it("Try to call register_class with an empty parameter", () => {
    expect(() => factory.register_class()).toThrow();
  })

})



