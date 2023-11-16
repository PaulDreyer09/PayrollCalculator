import { Visitor } from "./visitor.js";

export class JsonLoaderVisitor extends Visitor {
  constructor() {
    super();
    this.file_promise_map = {};
    this.pending_commands = [];
  }

  _load_json_file(path) {
    if (path in this.file_promise_map) {
      return;
    }

    try {
      this.file_promise_map[path] = fetch(path);
    } catch (error) {
      console.error("Error fetching command data", error.message);
    }
  }

  _load_pending_command(command, pending_data_reference) {
    const path = command.json_file_path;
    if (path) {
      this._load_json_file(path);

      this.pending_commands.push({
        command,
        pending_data_reference,
      });
    }
  }

  visitSetTableCommand(command) {
    this._load_pending_command(command, "tableData");
  }

  visitSetValueCollectionCommand(command) {
    this._load_pending_command(command, "inputData");
  }

  async initialize_pending_commands() {
    for (const {command, pending_data_reference} of this.pending_commands) {
      const data = await this.file_promise_map[command.json_file_path];

      if (!data.ok) {
        throw new Error("The fetch response did not return Ok");
      }

      try {
        const object_data = await data.clone().json();
        const reference = command["json_data_reference"];

        if (reference) {
          command[pending_data_reference] = object_data[reference];
          continue;
        }

        command[referene] = data;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
