export const Visitor = jest.fn.mockImplementation(function () {
  // Composite Commands
  this.enter_command_list = jest.fn()
  
  exit_command_list(commandList) = jest.fn()

  // Set Constant Commands
  this.visit_set_table_command= jest.fn()
    
  this.visit_set_value_collection_command= jest.fn()
    
  this.visit_set_value_command= jest.fn()

  // IO Commands  
  this.visit_define_input_command= jest.fn()
    
  this.visit_define_output_command= jest.fn()
    
  // Arithmetic Commands
  this.visit_add_command= jest.fn()
    
  this.visit_subtract_command= jest.fn()
    
  this.visit_multiply_command= jest.fn()
    
  this.visit_divide_command= jest.fn()
    
  this.visit_annualize_command= jest.fn()
    
  this.visit_de_annualize_command= jest.fn()
    
  this.visit_lesser_of_command= jest.fn()
    
  this.visit_floored_difference_command= jest.fn()
    
  this.visit_calculate_limited_percentage_command= jest.fn()
    
  this.visit_tabled_calculation_command= jest.fn()
    
  this.visit_calculate_added_total_by_tiers_command= jest.fn()
    
  this.visit_calculate_tax_by_tiers_command= jest.fn()
}) 