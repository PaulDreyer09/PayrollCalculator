import { AbstractFactory } from "../public/js/modules/factory/abstractFactory";
import { test_function_valid_result_cases, test_function_throws_invalid_cases, test_async_function_throws_invalid_cases } from "./test_functions.js";
import * as Commands from "../public/js/modules/commands/classes/arithmaticCommands/arithmaticCommandTypes.js";
import { CommandList } from "../public/js/modules/commands/classes/compositeCommands/commandList.js";
import { add_prefix_to_string_list } from "../public/js/modules/utils/stringManipulation.js";

describe("AbstractFactory Class Tests", () => {
  const module_paths = add_prefix_to_string_list("../commands/classes/", ["arithmaticCommands/arithmaticCommandTypes.js", "compositeCommands/commandList.js"]);

  describe("Test register_classes_to_factory_from_modules and _get_class_constructor method", () => {
    let factory = new AbstractFactory();

    describe("Valid cases.", () => {
      factory.register_class(Commands.AddCommand);
      factory.register_class(CommandList);
      test_function_valid_result_cases(
        "Test if _get_class_constructor method will return the registered class",
        (factory, name) => factory._get_class_constructor(name),
        [
          [factory, "AddCommand", Commands.AddCommand],
          [factory, "CommandList", CommandList],
        ]
      );
    });

    describe("Invalid cases.", () => {
      test_function_throws_invalid_cases(
        "Test if _get_class_constructor method will return the registered class",
        (factory, name) => factory._get_class_constructor(name),
        [
          [factory, "Invalid"],
          [factory, null],
          [factory, undefined],
          [factory, 1],
          [factory, true],
          [factory, []],
          [factory, {}],
          [factory, () => {}],
        ]
      );
    });
  });

  describe("Test register_classes_to_factory_from_modules method", () => {
    describe("Valid cases.", () => {
      describe("Basic cases.", () => {
        it("Testing with arithmaticCommandTypes and commandList module paths and testing if AddCommand and CommandList are registered to the factory", async () => {
          const factory = new AbstractFactory();
          await factory.register_classes_to_factory_from_modules(module_paths);

          expect(factory._get_class_constructor("AddCommand")).toBe(Commands.AddCommand);
          expect(factory._get_class_constructor("CommandList")).toBe(CommandList);
        });
      });
      describe("Edge cases.", () => {
        it("Testing with an empty array for module_paths", async () => {
          const factory = new AbstractFactory();
          await factory.register_classes_to_factory_from_modules([]);
          expect(factory._registered_classes).toEqual({});
        });
      });
    });

    describe("Invalid cases.", () => {
      const factory = new AbstractFactory();
      const callback = async (factory, ...params) => {
        await factory.register_classes_to_factory_from_modules(...params);
      };

      test_async_function_throws_invalid_cases("Invalid input parameters.", callback, [
        [factory, "Invalid"],
        [factory, ["Invalid Path"]],
        [factory, () => {}],
        [factory, {}],
        [factory, undefined],
        [factory, null],
        [factory, NaN],
      ]);
    });
  });

  describe("Test get_factory_with_classes_registered_from_modules method", () => {
    describe("Valid cases.", () => {
      describe("Basic cases.", () => {
        it("Testing with arithmaticCommandTypes and commandList module paths and testing if AddCommand and CommandList are registered to the factory", async () => {
          const factory = await AbstractFactory.get_factory_with_classes_registered_from_modules(module_paths);

          expect(factory._get_class_constructor("AddCommand")).toBe(Commands.AddCommand);
          expect(factory._get_class_constructor("CommandList")).toBe(CommandList);
        });
      });
      describe("Edge cases.", () => {
        it("Testing with an empty array for module_paths", async () => {
          const factory = await AbstractFactory.get_factory_with_classes_registered_from_modules([]);
          expect(factory._registered_classes).toEqual({});
        });
      });
    });

    test_async_function_throws_invalid_cases("Invalid cases.", AbstractFactory.get_factory_with_classes_registered_from_modules, [
      ["Invalid"],
      [["Invalid Path"]],
      [() => {}],
      [{}],
      [undefined],
      [null],
      [NaN],
    ]);
  });

  describe("Test get_class_instance_from_json_file method", () => {
    const factory = new AbstractFactory();
    //Default path where
    const class_path = "./json/plans/southAfrica/plan.json";

    const data_fetcher_function_mocks_map = async (path) => {
      const map = {
        CommandList: {
          class_name: "CommandList",
          params: [],
          children: [],
        },
        AddCommand: {
          class_name: "AddCommand",
          params: ["net_salary", "gross_salary", "de_annualized_uif"],
        },
        SubtractCommand: {
          class_name: "SubtractCommand",
          params: ["net_salary", "gross_salary", "de_annualized_uif"],
        },
      };

      return map[path];
    };

    beforeEach(() => {
      factory._registered_classes = {};
    });

    describe("Valid cases.", () => {
      it("Basic Cases", async () => {
        await factory.register_classes_to_factory_from_modules(module_paths);
        // console.log("Fetcher function: ", data_fetcher_function_mocks_map[CommandList])

        //Test creating a CommandList from received data from a fetcher function
        expect((await factory.get_class_instance_from_json_file("CommandList", data_fetcher_function_mocks_map)).constructor).toBe(CommandList);

        //Test creating a AddCommand from received data from a fetcher function
        expect((await factory.get_class_instance_from_json_file("AddCommand", data_fetcher_function_mocks_map)).constructor).toBe(Commands.AddCommand);

        //Test creating a Subtract from received data from a fetcher function
        expect((await factory.get_class_instance_from_json_file("SubtractCommand", data_fetcher_function_mocks_map)).constructor).toBe(
          Commands.SubtractCommand
        );
      });
    });

    describe("Invalid cases.", () => {
      factory.register_class(Commands.AddCommand);
      console.log("Factory: ", factory._registered_classes);

      //Invalid json_path inputs
      describe.each([undefined, null, 1, true, [], {}, () => {}])("Invalid json_path inputs", (json_path) => {
        it(`json_path = ${json_path}`, async () => {
          factory.register_class(Commands.AddCommand);
          await expect(() => factory.get_class_instance_from_json_file(json_path, data_fetcher_function_mocks_map)).rejects.toThrow();
        });
      });

      //Invalid input data_fetcher_function for factory.get_class_instance_from_json_file
      const invalid_functions = [
        "Some string input",
        1,
        NaN,
        undefined,
        null,
        [],
        {},
        () => "Some string output",
        () => 1,
        () => null,
        () => undefined,
        () => NaN,
        () => {},
        () => [],
      ];

      describe.each(invalid_functions)("Invalid data_fetcher_function_list", (data_fetcher_function) => {
        it(`data_fetcher_function = ${data_fetcher_function}`, async () => {
          factory.register_class(Commands.AddCommand);
          await expect(() => factory.get_class_instance_from_json_file("Some valid path", data_fetcher_function)).rejects.toThrow();
        });
      });
    });
  });

  describe("Test get_class_instance method", () => {
    const factory = new AbstractFactory();

    beforeEach(() => {
      factory._registered_classes = {};
    });

    describe("Valid cases.", () => {
      //Class constructors with the required data to build an instance using the factory
      const classes_to_test = [
        {
          ctor: CommandList,
          create_data: {
            class_name: "CommandList",
            params: [],
            children: [],
          },
        },
        {
          ctor: Commands.AddCommand,
          create_data: {
            class_name: "AddCommand",
            params: ["net_salary", "gross_salary", "de_annualized_uif"],
          },
        },
        {
          ctor: Commands.SubtractCommand,
          create_data: {
            class_name: "SubtractCommand",
            params: ["net_salary", "gross_salary", "de_annualized_uif"],
          },
        },
      ];

      //Test if each class can be registered and created
      describe.each(classes_to_test)("Basic cases", ({ ctor, create_data }) => {
        it(`Register ${ctor.name} and an instance can be created`, () => {
          factory.register_class(ctor);
          const instance = factory.get_class_instance(create_data);
          expect(instance.constructor).toBe(ctor);
        });
      });
    });
    describe("Invalid cases.", () => {
      describe("Invalid creation data to build an instance", () => {
        //Invalid data to pass to create a class instance using the factory
        const invalid_object_structure_test_cases = [
          {
            name: "AddCommand", //invalid property for class_name
            params: ["net_salary", "gross_salary", "de_annualized_uif"],
          },
          {
            class_name: "AddCommand",
            param: ["net_salary", "gross_salary", "de_annualized_uif"], //invalid property for class_name
          },
        ];
        
        const invalid_class_name_test_cases = [
          {
            class_name: "SubtractCommand", //Not a registered class
            params: ["1", "12", "13"],
          },
          {
            class_name: 1,
            params: ["1", "12", "13"],
          },
          {
            class_name: undefined,
            params: ["1", "12", "13"],
          },
          {
            class_name: null,
            params: ["1", "12", "13"],
          },
          {
            class_name: [],
            params: ["1", "12", "13"],
          },
          {
            class_name: {},
            params: ["1", "12", "13"],
          },
          {
            class_name: () => {},
            params: ["1", "12", "13"],
          },
        ];

        //Testing with invalid creation data object structure cases to throw
        describe.each(invalid_object_structure_test_cases)("Invalid creation data object structure cases", (create_data) => {
          it(`Input data: ${create_data}`, () => {
            factory.register_class(Commands.AddCommand);
            expect(() => factory.get_class_instance(create_data)).toThrow();
          });
        });
       });
    });
  });
  describe("Test register_classes_to_factory_from_modules function", () => {
    describe("Valid cases.", () => {});
    describe("Invalid cases.", () => {});
  });
  describe("Test register_classes_to_factory_from_modules function", () => {
    describe("Valid cases.", () => {});
    describe("Invalid cases.", () => {});
  });

  // register_classes_to_factory_from_modules
  // get_factory_with_classes_registered_from_modules
  // get_class_instance_from_json_file
  // _get_class_constructor
  // register_class
  // get_class_instance

  // it("Registering and getting a class constuctor", () => {
  //   factory.register_class(Commands.AddCommand);
  //   expect(factory._get_class_constructor("AddCommand")).toBe(Commands.AddCommand);
  // });

  // it("Registering and creating a class instance", () => {
  //   factory.register_class(Commands.AddCommand);
  //   const instance = factory.get_class_instance({ class_name: "AddCommand", params: ["Some String"] });
  //   expect(instance.constructor).toBe(Commands.AddCommand);
  // });

  // it("Registering a duplicate class", () => {
  //   factory.register_class(Commands.AddCommand);
  //   expect(() => {
  //     factory.register_class(Commands.AddCommand);
  //   }).toThrow();
  // });

  // it("Registering and creating a composite class", () => {
  //   factory.register_class(Commands.AddCommand);
  //   factory.register_class(CommandList);
  //   const instance = factory.get_class_instance({
  //     class_name: "CommandList",
  //     params: ["Parent"],
  //     children: [{ class_name: "AddCommand", params: ["Child"] }],
  //   });

  //   const child_instance = instance.children[0];

  //   expect(child_instance.constructor).toBe(Commands.AddCommand);
  // });

  // it("Try to get an unregistered class constructor", () => {
  //   expect(() => factory._get_class_constructor("UnregisteredClass")).toThrow();
  // });

  // it("Try to call register_class with passing an invalid parameter", () => {
  //   expect(() => factory.register_class("Invalid")).toThrow();
  //   expect(() => factory.register_class(12)).toThrow();
  //   expect(() => factory.register_class(true)).toThrow();
  //   expect(() => factory.register_class(undefined)).toThrow();
  //   expect(() => factory.register_class(null)).toThrow();
  //   expect(() => factory.register_class([])).toThrow();
  //   expect(() => factory.register_class({})).toThrow();
  // });

  // it("Try to call register_class with an empty parameter", () => {
  //   expect(() => factory.register_class()).toThrow();
  // });
});

describe("CommandFactory Calss Tests", () => {

});
