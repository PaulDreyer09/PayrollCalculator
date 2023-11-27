import { Visitor } from "./visitor.js";

export class JsonLoaderVisitor extends Visitor {
  constructor(fetch_data_function) {
    super();
    this.file_promise_map = {}; // path -> [promise, json_value]
    this.pending_commands = [];
    this.fetch_data_function = fetch_data_function;
    this.data_cache = {} // path -> 
  }

  _load_pending_command(command) {
    if (command.json_file_path) {
      this.pending_commands.push(command);
    }
  }

  visit_set_table_command(command) {
    this._load_pending_command(command);
  }

  visit_set_value_collection_command(command) {
    this._load_pending_command(command);
  }

  async initialize_pending_commands() {
    for (const command  of this.pending_commands) {
      command.input_data = await this.fetch_data_function(command.json_file_path);
    }
  }
}
