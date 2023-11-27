import * as ct from "./commandsController";
import { AbstractFactory, MockCommand } from "../factory/abstractFactory";
import { JsonLoaderVisitor } from "../commands/visitors/jsonLoaderVisitor";
import { register_classes_to_factory } from "../commands/classes/arithmaticCommands/arithmaticCommandTypes.js";

// Mock the AbstractFactory class for testing get_class_instance
jest.mock("../factory/abstractFactory");

// Mock the JsonLoaderVisitor class for testing initialize_pending_commands
jest.mock("../commands/visitors/jsonLoaderVisitor");
// jest.mock("../commands/visitors/jsonLoaderVisitor", () => {
//   return {
//     JsonLoaderVisitor: jest.fn(() => ({
//       initialize_pending_commands: jest.fn(),
//     })),
//   };
// });

// Mock one of the imports for register_classes_to_factory for testing
jest.mock("../commands/classes/arithmaticCommands/arithmaticCommandTypes.js", () => {
  return {
    register_classes_to_factory: jest.fn((factory) => factory.register_class(MockCommand)),
  };
});

describe("get_module_location Function test", () => {
  //Path to test if the module list is getting fetched from the correct location
  const module_location_path = "./js/modules/commands/classes/registration_module_list.json";

  //Path to test if the plans are getting fetched from the given path parameter
  const plan_path = "/Some/Mock/Location";

  //Basic path to test getting a module for testing register_classes_to_factory
  const mock_module_path = "arithmaticCommands/arithmaticCommandTypes.js";

  //Object containing different return data for mock_data_fetcher.
  const mock_return_data = {};

  //Mock plan to return for command_json
  mock_return_data[plan_path] = { class_name: "MockCommand", params: "Mock Me" };

  //Mock path returned by get_module_locations
  mock_return_data[module_location_path] = [mock_module_path];

  //Mock the data_fetcher_function to return an array with a mock module path inside
  const mock_data_fetcher = jest.fn((path) => {
    if (!(path in mock_return_data)) {
      throw new Error("Invalid path provided for testing. Provided: ", path);
    }

    return mock_return_data[path];
  });

  beforeEach(() => {
    mock_data_fetcher.mockClear();
    AbstractFactory.mockClear();
    JsonLoaderVisitor.mockClear();
    register_classes_to_factory.mockClear();
  });

  it("Returns MockCommand instance", async () => {
    const result = await ct.get_command(plan_path, mock_data_fetcher);

    //Test if a MockCommand is returned by get_command
    expect(result.constructor).toBe(MockCommand);

    // Verify that the AbstractFactory was instantiated
    expect(AbstractFactory).toHaveBeenCalledTimes(1);

    const factory_instance = AbstractFactory.mock.instances[0];

    // Verify that the get_class_instance method of the AbstractFactory was called with the command JSON
    expect(factory_instance.get_class_instance).toHaveBeenCalledWith(mock_return_data[plan_path]);

    //Verify that the register_class method of the AbstractFactory has been called 
    expect(factory_instance.register_class).toHaveBeenCalled();

    expect(JsonLoaderVisitor).toHaveBeenCalledWith(mock_data_fetcher);

    // Verify that the JsonLoaderVisitor was instantiated with the data_fetcher_function
    expect(JsonLoaderVisitor).toHaveBeenCalledWith(mock_data_fetcher);


    // Verify that the initialize_pending_commands method of the JsonLoaderVisitor was called
    expect(JsonLoaderVisitor.mock.instances[0].initialize_pending_commands).toHaveBeenCalled();

    //Verify if the data_fetcher_function was called using the correct paths
    expect(mock_data_fetcher).toHaveBeenCalledWith(module_location_path);
    expect(mock_data_fetcher).toHaveBeenCalledWith(plan_path);
  });

  it("Handle Data Fetcher Error", async () => {
    const path = "Some Path";
    const error_message = "Data fetch error";
    // Mock the data_fetcher_function to throw an error
    mock_data_fetcher.mockRejectedValue(new Error(error_message));

    // Verify that the data_fetcher_function throws the error
    await expect(ct.get_command(path, mock_data_fetcher)).rejects.toThrow(error_message);

    // Verify that the data_fetcher_function was called with the correct path
    expect(mock_data_fetcher).toHaveBeenCalledWith(path);
  });
});
